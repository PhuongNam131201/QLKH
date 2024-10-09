import { gql, request } from 'graphql-request';

const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/cm21fht9401o507wf5ktsj1qf/master";

export const getCourseList=async (level) => {
    const query = gql`
    query CourseList {
  courses {
    id
    name
    price
    level
    stage
    time
    author
    banner {
      url
    }
    chapter {
      id
      context {
        html
        markdown
        raw
        text
      }
      output {
        markdown
      }
      title
    }
    descripsion {
      markdown
    }
  }
}

    `
    const result=await request(MASTER_URL,query)
    return result;
}

export const enrollCourse=async(courseId,userEmail)=>{
    const mutationQuery=gql`
    mutation MyMutation {
  createUserConrolledCourse(
    data: {courseId: "`+courseId+`", userMail: "`+userEmail+`", course: {connect: {id: "`+courseId+`"}}}
  ) {
    id
  }
  publishManyUserConrolledCoursesConnection(to: PUBLISHED) {
    edges {
      node {
        id
      }
    }
  }
}`
    const result=await request(MASTER_URL,mutationQuery)
    return result;
}