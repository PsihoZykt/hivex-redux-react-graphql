import {createSlice} from '@reduxjs/toolkit'

interface Task {
  id: number,
  text: string,
}

interface TaskState {
  task: Task,
  getAll: () => Task[],

}


const initialState = {task: {id: 0, text: "empty"}} as TaskState

export const taskSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  },
)
