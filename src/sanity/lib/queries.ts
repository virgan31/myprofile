import { defineQuery } from 'next-sanity'

export const PROFILE_QUERY = defineQuery(`*[_type == "profile"][0]{
  name,
  headline,
  bio,
  profileImage,
  location,
  email,
  socialLinks,
  favicon,
  ogImage
}`)

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  coverImage,
  summary,
  techStack,
  projectUrl,
  githubUrl
}`)
