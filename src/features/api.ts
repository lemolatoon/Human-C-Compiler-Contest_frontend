import useSWR from 'swr'

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
  ProblesIsCorrect,
} from '@/features/types'

const Fetcher = (path: string): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    credentials: 'include',
  }).then((res) => res.json())
}

export const useMe = () => {
  const { data, error } = useSWR<UserResponse>(`/api/users/me`, Fetcher)

  return {
    userResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useProblemList = () => {
  const { data, error } = useSWR<ProblemListResponse>(`/api/problems/`, Fetcher)

  return {
    problemListResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useProblem = (id: number) => {
  const { data, error } = useSWR<ProblemResponse>(
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
  const url = userID
    ? `/api/submissions/?user_id=${userID}`
    : `/api/submissions/`
  const { data, error } = useSWR<SubmissionJoinedUserListResponse>(
    !isSkip && url,
    Fetcher,
  )

  return {
    submissionListResponse: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSubmission = (id: number) => {
  const { data, error } = useSWR<SubmissionJoinedUserResponse>(
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
  const { data, error } = useSWR<RankingResponse>(`/api/ranking/`, Fetcher)

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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register/`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout/`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/problems/${id}/submissions/`,
    options,
  ).then((res) => res.json())
}

export const useProblemIsCorrectList = (userID?: number) => {
  const isSkip = userID === undefined
  const {
    problemListResponse,
    isLoading: isProblemLoading,
    isError: isProblemError,
  } = useProblemList()
  const {
    submissionListResponse,
    isLoading: isSubmissionLoading,
    isError: isSubmissionError,
  } = useSubmissionList(userID, isSkip)

  if (!userID) {
    // 非ログイン
    const data = problemListResponse?.items.map((v) => ({
      ...v,
      isCorrect: false,
    }))
    return {
      problemIsCorrectList: data,
      isLoading: isProblemLoading,
      isError: isProblemError,
    }
  }

  // ログイン済み
  if (isProblemLoading || isSubmissionLoading) {
    return {
      problemIsCorrectList: undefined,
      isLoading: true,
      isError: isProblemError || isSubmissionError,
    }
  }

  if (!problemListResponse || !submissionListResponse) {
    return {
      problemIsCorrectList: undefined,
      isLoading: false,
      isError: isProblemError || isSubmissionError,
    }
  }

  const problemIDsOfAC = submissionListResponse.items
    .filter((v) => v.result === 'AC')
    .map((v) => v.id)
  const data: ProblesIsCorrect[] = problemListResponse.items.map((v) => ({
    ...v,
    isCorrect: problemIDsOfAC.includes(v.id),
  }))

  return {
    problemIsCorrectList: data,
    isLoading: false,
    isError: undefined,
  }
}
