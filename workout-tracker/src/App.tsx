
//联合类型，muscleGroup 字段只能是这5个字符串之一，写其他值 TS 直接报错。
 type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms'

//  定义一条训练记录的形状，就像 Java 的 class 但只描述结构，不能 new。
// 每个字段都必须有，缺一个 TS 报错。   
// ? 表示可选，这条记录可以有备注，也可以没有。 
// 已经提前定义了 WorkoutLog ，作为泛型在下面定义状态    
interface WorkoutLog {                               
    id: number                                       
    date: string                                       
    exercise: string                                   
    muscleGroup: MuscleGroup                           
    sets: number                                       
    reps: number                                       
    weightKg: number                                   
    note?: string                                      
  }   

  type Grade = 'S'|'A'|'B'| 'C' 
  function getGrade(weightKg:number) : Grade{
      if(weightKg >= 100 ){
          return 'S';
      }else if ( weightKg >= 80 ){
          return 'A';
      }else if ( weightKg >= 60){
          return 'B';
      }else {
          return 'C';
      }
  }



  // 第三个函数：filterByExercise                         
  // // 在做什么：                                         
  // 从所有记录里，筛选出某个动作名的记录。比如只看所有 "bench press" 的历史。                             
                                                       
  // 为什么： 练习数组的 .filter() 方法，这是 JavaScript  
  // 里最常用的数组操作之一。
  // filter 里面要一个函数
  //  /toLocaleString() 不是转小写，它是把值转成本地化字符串格式，用在数字上的。  
  type ExerciseGroup ='bench press'|'squat'|'deadlift'| 'pull up' | 'shoulder press'
  function filterByExercise(logs: WorkoutLog[], exercise: string) :WorkoutLog[]{
       const exerciseFilter = logs.filter(log => log.exercise.toLocaleString() === exercise.toLocaleLowerCase())
        return exerciseFilter;
      }


  //  第四个函数：getPersonalBest                      
  // 在做什么： 找出某个动作的历史最大重量。比如 "bench 
  // press" 打过的最重是多少 kg。                   
  // 为什么： 练习组合使用 .filter() + .map() +           
  // Math.max()，这三个连着用是很常见的模式。                   
    // 第一步：用 filterByExercise 筛出这个动作的所有记录                               
    // 第二步：用 .map() 把每条记录变成只有 weightKg的数组                                               
    // 第三步：用 Math.max(...weights) 取最大值      
    // 第四步：如果没有记录返回 0   
    
    function getPersonalBest(logs: WorkoutLog[] ,exercise: string) : number{
        const exerciseFilter = filterByExercise(logs,exercise);
      if(exerciseFilter.length === 0){
        return 0;
      }else{
        const weights = exerciseFilter.map(log => log.weightKg)
        const exerciseMap  = Math.max(...weights);
        return exerciseMap;
      }
    }




    // "2026-04-01" >= "2026-03-31"  字符串日期可以直接比较大小 
  function getWeeklyCount(logs: WorkoutLog[]): number {
    const today = new Date()                           
    const dayOfWeek = today.getDay()                   
    const daysFromMonday = dayOfWeek === 0 ? 6 :       
  dayOfWeek - 1                                        
    const mondayDate = new Date(today)                 
    mondayDate.setDate(today.getDate() -               
  daysFromMonday)                                      
    const mondayStr =                                  
  mondayDate.toISOString().split('T')[0]               
    return logs.filter(log => log.date >=            
  mondayStr).length                                    
  }                                                  
         


import { useState } from 'react'

  export default function App() {
    //  logs 是所有训练记录的数组，初始是空的。setLogs 是更新它的函数。   
    const [logs, setLogs] = useState<WorkoutLog[]>([])
    //每条记录需要唯一的 id，从 1 开始，每次添加后 +1
    const [nextId, setNextId] = useState(1)
    //六个是表单的状态，对应用户填写的每一个输入框。用户改输入框 → 对应的状态更新 →                        
    // 点添加时把这些状态组合成一条记录。repetitions(次数)
    const [exercise, setExercise] = useState('')
    const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('chest')
    const [sets, setSets] = useState(3)
    const [reps, setReps] = useState(8)
    const [weightKg, setWeightKg] = useState(60)
    const [note, setNote] = useState('')

    return <div>todo</div>
  }


  // addLog 函数                                                                                  
  // 在做什么： 点击添加按钮时，把表单里的数据变成一条  
  // WorkoutLog，加进 logs 数组里。                       
  
  // 为什么： 练习怎么用 setLogs                          
  // 更新状态，以及怎么构造一个符合 interface 的对象。 