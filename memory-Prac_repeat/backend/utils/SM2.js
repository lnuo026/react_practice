  /**                                     
   * 新难度系数 = 旧难度系数 + (0.1 - (5-质量) × (0.08 + (5-质量) × 0.02)) 
   * 间隔公式：                                                    
   *   第1次答对 → 1天                                             
   *   第2次答对 → 6天                                             
   *   第N次答对 → 前次间隔 × EF                                   
   *                                          
   * 难度系数公式：                                                
   *   EF' = EF + (0.1 - (5-q) × (0.08 + (5-q) × 0.02))
   *   EF 最小值 = 1.3                                             
   *                                          
   * @param {number} quality     - 打分：0=忘了，3=困难，5=简单    
   * @param {number} repetitions - 连续答对次数
   * @param {number} easeFactor  - 当前难度系数（默认2.5）         
   * @param {number} interval    - 当前间隔天数
   * @returns {{ interval, easeFactor, repetitions, nextReviewDate }}                                      
   */    
  export function sm2(quality, repetitions, easeFactor, interval) {
    let newInterval                                                
    let newRepetitions                    
    let newEaseFactor                         
                                                                   
    if (quality >= 3) {
      // 答对了                                                    
      if (repetitions === 0) {                
        newInterval = 1             // 第1次答对 → 1天后                                    
      } else if (repetitions === 1) {
        newInterval = 6              // 第2次答对 → 6天后                              
      } else {
        newInterval = Math.round(interval * easeFactor)   // 第3次以后 → 上次天数 × 难度系数            
      }                                       
      newRepetitions = repetitions + 1  
    } else {
      // 答错了，重置                                              
      newInterval = 1            // 重置，明天再来             
      newRepetitions = 0          // 连续答错次数清零 
    }             
                         
    
    // 更新难度系数
    newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))                         
    // 最低不能低于 1.3
    if (newEaseFactor < 1.3) newEaseFactor = 1.3   
                                              
    const nextReviewDate = new Date()                              
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval)
                                                                   
    return { 
        interval: newInterval, 
        easeFactor: newEaseFactor,
        repetitions: newRepetitions, nextReviewDate 
    }                    
  }  

