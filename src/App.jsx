import React from 'react'
import WorkspaceBoard from './pages/user/WorkspaceBoard'
import Board from './pages/user/Board'
import WorkspaceSetting from './pages/user/WorkspaceSetting'
// import LoginPage from './pages/auth/LoginPage'
// import RegisterPage from './pages/auth/RegisterPage'
import TaskDetailComponent from './components/task/TaskDetailComponent'
import ChecklistComponent from './components/task/ChecklistComponent'
import CreateCardComponent from './components/task/CreateCardComponent'
import LabelComponent from './components/task/LabelComponent'
import SearchMemberComponent from './components/task/SearchMemberComponent'
import {CreateBoardComponent} from './components/task/CreateBoardComponent'
import { ShareBoardComponent } from './components/task/ShareBoardComponent'
import { AttachFileComponent } from './components/task/AttachFileComponent'
import { Delete } from 'lucide-react'
import { DeleteChecklistComponent } from './components/task/DeleteChecklistComponent'
import { AddCardComponent } from './components/task/AddCardComponent'

export default function App() {
  return (
    <>
    <WorkspaceSetting/>
    <WorkspaceBoard/>
    <Board/>
    <TaskDetailComponent/>
    <div className="flex gap-10">
      <ChecklistComponent/>
      <CreateCardComponent/>
      <LabelComponent/>
      <SearchMemberComponent/>
    </div>
    <CreateBoardComponent/>
    <ShareBoardComponent/>
    <AttachFileComponent/>
    <DeleteChecklistComponent/>
    <AddCardComponent/>
    {/* <LoginPage/>
    <RegisterPage/> */}
    </>
    
  )
}
