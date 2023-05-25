import { Courses, DetailedCourse } from "../types/Course";
import { Token } from "../types/Token";

const API_URL = 'https://api.wisey.app';
const VERSION_URL = '/api/v1';
const BASE_URL = API_URL + VERSION_URL;
const COURSES = '/core/preview-courses';
const AUTH = '/auth/anonymous?platform=subscriptions';

function handleErrors(response: Response) {
  if (!response.ok) {
    return Promise.reject(
      new Error(`${response.status} - ${response.statusText}`));
  };

  if (!response?.headers?.get('content-type')?.includes('application/json')) {
    return Promise.reject(
      new Error('Content type is not supported')
    )
  }
  return response.json();
}

async function request<T>(
  url: string,
): Promise<T> {
  const tokenData = await fetch(BASE_URL + AUTH);
  const { token }: Token = await tokenData.json();
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  const data = await fetch(BASE_URL + url, options);
  return handleErrors(data);
};

export const fetchClient = {
  getCourses: () => request<Courses>(COURSES),
  getCourse: (id: string) => request<DetailedCourse>(`${COURSES}/${id}`)
}