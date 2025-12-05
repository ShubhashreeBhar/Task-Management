import React, { useCallback } from 'react'
import { ADD_BUTTON, EMPTY_STATE, FILTER_LABELS, FILTER_OPTIONS, FILTER_WRAPPER, HEADER, ICON_WRAPPER, LABEL_CLASS, SELECT_CLASSES, STAT_CARD, STATS, STATS_GRID, TAB_BASE, TAB_ACTIVE,TAB_INACTIVE, TABS_WRAPPER, VALUE_CLASS, WRAPPER } from '../assets/dummy'
import { Calendar, CalendarIcon, HomeIcon, Plus, Filter } from 'lucide-react'
import { useState } from 'react'
import { useMemo } from 'react'
import {useOutletContext} from 'react-router-dom';
import TaskItem from '../components/TaskItem'
import TaskModal from '../components/TaskModal'
import {isToday} from 'date-fns'

const API_BASE='http://localhost:4000/api/tasks'
const Dashboard = () => {

  const {tasks=[],refreshTasks,handleLogout}=useOutletContext()
  const [showModal,setShowModal]=useState(false)
  const [selectedTask,setSelectTask] =useState(null)
  const [filter,setFilter]=useState("all")

  const stats=useMemo(()=>({
    total:tasks.length,
    lowPriority:tasks.filter(t=>t.priority?.toLowerCase()==='low').length,
    mediumPriority:tasks.filter(t=>t.priority?.toLowerCase()==='medium').length,
    highPriority:tasks.filter(t=>t.priority?.toLowerCase()==='high').length,
    completed:tasks.filter(t=>t.completed===true || t.completed ===1 ||(
      typeof t.completed==='string' && t.completed.toLowerCase() === 'yes')
    ).length

  }),[tasks]);

  //Filter Tasks

  const filteredTasks=useMemo(()=>{
    const today=new Date()
    const nextWeek=new Date (today);
    nextWeek.setDate(today.getDate()+7)

    let filtered = tasks.filter(task => {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;

    switch(filter){
      case"today" :
          return dueDate.toDateString()===today.toDateString()
      case "week":
          return dueDate>= today && dueDate <=nextWeek
      case "high":
      case "medium":
      case "low":
          return task.priority?.toLowerCase() ===filter
      default:
         return true
    }
  });
  if (filter === "all") {
    filtered.sort((a, b) => {
      const aDue = a.dueDate ? new Date(a.dueDate) : null;
      const bDue = b.dueDate ? new Date(b.dueDate) : null;

      const aIsToday = aDue && isToday(aDue);
      const bIsToday = bDue && isToday(bDue);

      if (aIsToday && !bIsToday) return -1;
      if (!aIsToday && bIsToday) return 1;

      // Optional: sort remaining by date ascending
      if (aDue && bDue) return aDue - bDue;
      if (aDue) return -1;
      if (bDue) return 1;

      return 0;
    });
  }

  return filtered;
}, [tasks, filter]);

  //SAVING TASKS
  const handleTaskSave=useCallback(async(taskData)=>{
    try{
      if(taskData.id) await axios.put(`${API_BASE}/${taskData.id}/gp`,taskData)
        refreshTasks()
      setShowModal(false)
      setSelectTask(null)

    }
    catch(error){
      console.error("Error saving tasks.",error)
    }
  },[refreshTasks])

  return (
    <div className={WRAPPER}>
      {/*HEADER*/}
      <div className={HEADER}>
      <div className='min-w-0'>
        <h1 className='text-xl md:text-3xl font-bold text-gray-800 items-center flex gap-2'>
            <HomeIcon className='text-sky-500 w-5 h-5 md:h-6 shrink-0'/>
            <span className='truncate'>Task Overview</span>
          </h1>
          <p className='text-sm text-gray-500 mt-1 ml-7 truncate'>Manage your tasks efficiently</p>

        </div>
        <button onClick={()=> setShowModal(true)} className={ADD_BUTTON}>
          <Plus size={18}/>
          Add New Task
        </button>
      </div>

      {/*STATS*/}
      <div className={STATS_GRID}>
        {STATS.map(({
          key,label,icon:Icon,iconColor,borderColor="border-sky-100",
          valueKey,textColor,gradient
        })=>(
          <div key={key} className={`${STAT_CARD} ${borderColor}`}>
            <div className='flex items-center gap-2 md:gap-3'>
              <div className={`${ICON_WRAPPER} ${iconColor}`}>
                <Icon className='w-4 h-4 md:w-5 md:h-5'/>
              </div>

              <div className='min-w-0'>
                <p className={`${VALUE_CLASS} ${gradient ?
                  "bg-gradient-to-r from-sky-400 to-sky-800 bg-clip-text text-transparent"
                  :textColor}`}>{stats[valueKey]}</p>
                  <p className={LABEL_CLASS}>{label}</p>
              </div>
          </div>
        </div>
        ))}
     </div>

     {/*Contents*/}
     <div className='space-y-6'>
      <div className={FILTER_WRAPPER}>
        <div className='flex items-center gap-2 min-w-0'>
          <Filter className='w-5 h-5 text-sky-500 shrink-0'/>
            <h2 className='text-base md:text-lg font-semibold text-gray-800 truncate'>
              {FILTER_LABELS[filter]}
            </h2>
      
        </div>
        <select value={filter} onChange={(e)=>setFilter(e.target.value)}
        className={SELECT_CLASSES}>
          {FILTER_OPTIONS.map(opt=><option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() +opt.slice(1)}
          </option>)}
        </select>
            <div className={TABS_WRAPPER}>
              {FILTER_OPTIONS.map(opt=>(
                <button key={opt} onClick={()=> setFilter(opt)} className={`${TAB_BASE} ${filter ===opt ?
                  TAB_ACTIVE :TAB_INACTIVE}`}>
                {opt.charAt(0).toUpperCase()+opt.slice(1)}
                </button>
              ))}
            </div>
      </div>

      {/*TASK LIST*/}
      <div className='space-y-4'>
        {filteredTasks.length==0 ? (
          <div className={EMPTY_STATE.wrapper}>
            <div className={EMPTY_STATE.iconWrapper}>
            <CalendarIcon className='w-8 h-8 text-sky-500'/>
            </div>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
               No task found!
            </h3>
            <p className='text-sm text-gray-500 mb-4'>{filter ==="all"?
            "Create your first task to get started" : "No tasks match this filter"}</p>
            <button onClick={()=>setShowModal(true)} className={EMPTY_STATE.btn}>
              Add New Task
            </button>
           
          </div>

        ):(
          filteredTasks.map(task=>(
            <TaskItem  key={task._id || task.id}
            task={task}
            onRefresh={refreshTasks}
            showCompleteCheckbox
            onEdit={()=>{setSelectTask(task); setShowModal(true)}}
            />
          ))
        )}
      </div>

      {/* Add task desktop*/}
      <div 
      onClick={()=>setShowModal(true)}
      className='hidden md:flex items-center justify-center p-4 border-2 border-dashed border-sky-200
      rounded-xl hover:border-sky-400 bg-sky-50/50 cursor-pointer transition-colors'>
        <Plus className='w-5 h-5 text-sky-500 mr-2'/>
        <span className='text-gray-600 font-medium'>Add new task</span>
      </div>
     </div>

     {/* Modal*/}
     <TaskModal isOpen={showModal}
      onClose={()=>{setShowModal(false); setSelectTask(null)}}
      taskToEdit={selectedTask}
      onSave={handleTaskSave}
      onLogout={handleLogout}/>
     </div>
   
  )
}

export default Dashboard;
