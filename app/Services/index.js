import { gql, request } from 'graphql-request';

const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/cm21fht9401o507wf5ktsj1qf/master";

export const getCourseList=async (level) => {
    const query = gql`
    query CourseList {
  courses (where: {level: `+level+`}){
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
      content {
        heading
        output {
          markdown
          html
        }
        desciption {
          markdown
          html
        }
      }
      title
      id
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
export const getUserEnrolledCourse=async(courseId,userEmail)=>{
    const query=gql`
    query GetUserEnrolledCourse {
  userConrolledCourses(where: {courseId: "`+courseId+`", userMail: "`+userEmail+`"}) {
    id
    courseId
    completedChapter {
      id
      chapterId
    }
  }
}
    `
    const result=await request(MASTER_URL,query)
    return result;
}
export const MarkChapterCompleted=async(chapterId,recordId,userEmail,points)=>{
  const mutationQuery=gql`
  mutation markChapterCompleted {
  updateUserConrolledCourse(
    where: {id: "`+recordId+`"}
    data: {completedChapter: {create: {data: {chapterId: "`+chapterId+`"}}}}
  ) {
    id
  }
  publishManyUserConrolledCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
  updateUserDetail(data: {point: `+points+`}, where: {email: "`+userEmail+`"}) {
    point
  }
  publishUserDetail(where: {email: "`+userEmail+`"}) {
    id
  }
}
  `
  const result=await request(MASTER_URL,mutationQuery)
    return result;
}
export const createNewUser=async(userName,email,profileImageUrl)=>{
  const mutationQuery=gql`
  mutation CreateNewUser {
  upsertUserDetail(
    upsert: {create: {email: "`+email+`", point: 10, profileImage: "`+profileImageUrl+`", userName: "`+userName+`"}, update: {email: "`+email+`", profileImage: "`+profileImageUrl+`", userName: "`+userName+`"}}
    where: {email: "`+email+`"}
  ) {
    id
  }
  publishUserDetail(where: {email: "`+email+`"}) {
    id
  }
}
    `
  const result=await request(MASTER_URL,mutationQuery)
    return result;
}
export const getUserDetail=async(email)=>{
  const query=gql`
  query GetUserDetail {
  userDetail(where: {email: "`+email+`"}) {
    point
  }
}
  `
  const result=await request(MASTER_URL,query)
    return result;
}
export const GetAllUsers=async()=>{
  const query=gql`
  query GetAllUsers {
  userDetails(orderBy: point_DESC) {
    id
    point
    profileImage
    userName
  }
}
  `
  const result=await request(MASTER_URL,query)
    return result;
}
export const  GetAllProgressCourse=async(userEmail)=>{
  const query=gql`
  query GetAllUserEnrolledProgressCourse {
  userConrolledCourses(where: {userMail: "`+userEmail+`"}) {
    completedChapter {
      chapterId
    }
    course {
      banner {
        url
      }
      chapter {
        id
        title
        content {
          desciption {
            html
            markdown
          }
          heading
          output {
            markdown
            html
          }
        }
      }
      descripsion {
        markdown
      }
      id
      level
      name
      price
      time
    }
  }
}
  `
  const result=await request(MASTER_URL,query)
    return result;
}
