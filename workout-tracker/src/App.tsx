
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







// handleAdd 写在 return 后面，逻辑上是"出口之后"的死区。
//   它现在能用是因为 JavaScript 有一个叫 hoisting（提升） 的机制，会把 function
// 声明自动提到顶部——但这是靠"意外"生效的，不是正确写法，以后拆组件会出问题。
// addLog 函数                    
// 在做什么： 点击添加按钮时，把表单里的数据变成一条WorkoutLog，加进 logs 数组里。                       
// 为什么： 练习怎么用 setLogs                          
// 更新状态，以及怎么构造一个符合 interface 的对象。 



function handleAdd(){
  
  //trim() 去掉首尾空格。如果用户没填动作名（空字符串或只有空格），直接退出函数，不添加记录。                                                  
  if (!exercise.trim()) return
  
  // WorkoutLog的一个对象，每个字段都要有
  const newLog: WorkoutLog = {
    id: nextId,
    //  split('X') = 遇到 X 就切断，结果是数组
    date: new Date().toISOString().split('T')[0],
    exercise: exercise.trim(),
    muscleGroup: muscleGroup,
    sets: sets,
    reps: reps,
    weightKg: weightKg,
    note: note.trim() || undefined,                
  }
  
  // React 把当前的 logs 值传进来，你叫它 prev   
  //  ...prev  → 展开旧数组里所有记录  
  //   添加完之后：                                         
  // - id 加一，下次用                                    
  // - 清空动作名输入框                                   
  // - 清空备注输入框 
  setLogs(prev => [newLog, ...prev])      
  setNextId(prev => prev + 1)                      
  setExercise('')                                    
  setNote('')
  setSets(3)
  setReps(8)
  setWeightKg(60)

}










        // onChange 是什么
        // 在做什么： 监听输入框的变化，每次用户打字就更新状态。每打一个字触发一次，状态实时更新。  
        //   onChange={e => setExercise(e.target.value)}          
        //           ↑          ↑                             
        //      事件对象    输入框当前的值                      
                                                          
        // 用户打一个字                                         
        //   → 浏览器触发 onChange 事件                         
        //   → 把事件对象 e 传进来                              
        //   → e.target 是这个输入框                            
        //   → e.target.value 是输入框里现在的文字              
        //   → setExercise 把状态更新成这个文字  
    return <div className='min -h-screen bg-gray-100 p-8'>
      <h1 className='font-pixel text-2xl text-center mb-8'>WORKOUT LOG</h1>
      <p className='font-pixel text-sm text-center mb-4'>本周已经训练{getWeeklyCount(logs)}</p>


      {/*  表单  */}
      <div className="max-w-xl mx-auto bg-white p-6 mb-6 shadow">
        {/* action name  */}
        <input 
        type="text" 
        placeholder='action name 是咩啊？'
        value={exercise}
        onChange={e => setExercise(e.target.value)}
        className="w-full border p-2 mb-3 font-pixel text-sm"
        />




        {/*  muscleGroup — 下拉选择框 <select> */}
        <select
          value={muscleGroup}
          onChange={e => setMuscleGroup(e.target.value as MuscleGroup)}
          className="w-full border p-2 mb-3 font-pixel text-sm"
        >
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="legs">Legs</option>
          <option value="shoulders">Shoulders</option>
          <option value="arms">Arms</option>
        </select>



      {/* 数字输入 */}
        <label className="font-pixel text-xs mb-1 block">多少组？ </label>
        <input 
        type="number"
        value={sets}
        // ：e.target.value 永远是字符串，所以要用 Number() 转成数字再存进状态
        onChange={e => setSets(Number(e.target.value))}
        className="w-full border p-2 mb-3 font-pixel text-sm"
        />



        <label className="font-pixel text-xs mb-1 block">多少次</label>
        <input 
        type="number"
        value={reps}
        placeholder='reps(次数)'
        onChange={e => setReps(Number(e.target.value))}
        className="w-full border p-2 mb-3 font-pixel text-sm"
        />

        <label className="font-pixel text-xs mb-1 block">重量(kg)</label>
        <input 
        type="number"
        value={weightKg}
        onChange={e => setWeightKg(Number(e.target.value))}
        className="w-full border p-2 mb-3 font-pixel text-sm"
        />



        {/* note */}
        <input 
        type="text" 
        placeholder='note 是咩啊？'
        value={note}
        onChange={e => setNote(e.target.value)}
        className="w-full border p-2 mb-3 font-pixel text-sm"
        />




      {/*  function handleAdd() { ... }        ← function 不能写在 return 之后 */}
        <button 
        onClick={handleAdd}
        className="w-full bg-green-400 p-3 font-pixel text-sm" 
        > 
        + 添加
        </button>
      </div>
      
      {/* 每添加一条训练记录，就在下面多出来一张"卡片"（card）, 显示这条记录的内容。 */}
      {/* 记录列表 */}
      {/* ⁉️⁉️ getGrade 为什么不用log，也就是map出来  */}
      {/*   getGrade 只需要一个数字（重量），不需要整条记录   */}
      {/* 所以在卡片里直接传重量就够了：
          {getGrade(log.weightKg)}
          //         ↑ 从这条记录里取出重量，传给函数   */}
      <div className="max-w-xl mx-auto flex flex-col gap-3">

        {/* 花括号里可以放任何 JS 表达式，包括 JSX 元素本身：&& <p> */}
        {/* && 不只是 true/false  , A && B - 如果 A 是假值 → 返回 A  ,- 如果 A 是真值 → 返回 B */}
        {logs.length === 0 && <p className='font-pixel text-lg text-center text-gray-1200'>暂无记录 </p>}
        {logs.map(log => ( 
          <div key={log.id} className="bg-white p-4 shadow font-pixel text-sm">
            {log.exercise} - {log.weightKg} Kg  - {getGrade(log.weightKg)} - {log.date} 
          </div>
        ))}
        </div>
    </div>

}

