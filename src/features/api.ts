import useSWR from 'swr'

import { NetworkError } from '@/features/errors'
import {
  UserPost,
  UserResponse,
  ResponseBase,
  ProblemListResponse,
  ProblemResponse,
  RankingResponse,
  SubmissionPost,
  SubmissionJoinedUserResponse,
  SubmissionJoinedUserListResponse,
} from '@/features/types'

const UnexpectedErrorStatus = 0

const Fetcher = async (path: string): Promise<any> => {
  let res
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
      credentials: 'include',
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new NetworkError(e.message, UnexpectedErrorStatus)
    }

    throw new NetworkError('unexpected error', UnexpectedErrorStatus)
  }

  if (!res.ok) {
    const error = new NetworkError(
      'An error occurred while fetching the data.',
      res.status,
    )
    throw error
  }

  return res.json()
}

export const useMe = () => {
  const { data, error } = useSWR<UserResponse, NetworkError>(
    `/api/users/me`,
    Fetcher,
  )

  return {
    userResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useProblemList = () => {
  const { data, error } = useSWR<ProblemListResponse, NetworkError>(
    `/api/problems`,
    Fetcher,
  )

  return {
    problemListResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useProblem = (id: number) => {
  const { data, error } = useSWR<ProblemResponse, NetworkError>(
    `/api/problems/${id}`,
    Fetcher,
  )

  return {
    problemResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSubmissionList = (userID?: number, isSkip: boolean = false) => {
  const url = userID ? `/api/submissions?user_id=${userID}` : `/api/submissions`
  const { data, error } = useSWR<
    SubmissionJoinedUserListResponse,
    NetworkError
  >(!isSkip && url, Fetcher)

  return {
    submissionListResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSubmission = (id: number) => {
  const { data, error } = useSWR<SubmissionJoinedUserResponse, NetworkError>(
    `/api/submissions/${id}`,
    Fetcher,
  )

  return {
    submissionResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useRanking = () => {
  const { data, error } = useSWR<RankingResponse, NetworkError>(
    `/api/ranking`,
    Fetcher,
  )

  return {
    rankingResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const requestLogin = async (data: UserPost): Promise<UserResponse> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  }
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
    options,
  ).then((res) => res.json())
}

export const requestRegister = async (
  data: UserPost,
): Promise<UserResponse> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`,
    options,
  ).then((res) => res.json())
}

export const requestLogout = async (): Promise<ResponseBase> => {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`,
    options,
  ).then((res) => res.json())
}

export const requestSubmission = async (
  id: number,
  data: SubmissionPost,
): Promise<SubmissionJoinedUserResponse> => {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/problems/${id}/submissions`,
    options,
  ).then((res) => res.json())
}
