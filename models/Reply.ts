export type Reply = {
  id: string
  surveyId: string
  itemReplies: ItemReply[]
}

export type ItemReply = {
  surveyItemId: string
  questionReplies: QuestionReply[]
}

export type QuestionReply = {
  questionId: string
  content: string
}
