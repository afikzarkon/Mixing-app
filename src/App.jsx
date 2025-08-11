import { useState } from 'react'
import './App.css'

function App() {
  const [answers, setAnswers] = useState('')
  const [mixedAnswers, setMixedAnswers] = useState('')
  const [markingStyle, setMarkingStyle] = useState('numbers-dots')
  const [showMarkingOptions, setShowMarkingOptions] = useState(false)

  const handleMixAnswers = () => {
    if (!answers.trim()) {
      alert('אנא הכנס תשובות לערבוב')
      return
    }

    // פיצול התשובות לפי שורות
    const answerLines = answers.split('\n').filter(line => line.trim())
    
    if (answerLines.length === 0) {
      alert('אנא הכנס תשובות לערבוב')
      return
    }

    // יצירת מערך של תשובות עם המספור המקורי
    const answersWithMarkers = answerLines.map(line => line.trim())
    
    // יצירת מערך של תשובות ללא המספור
    const cleanAnswers = answersWithMarkers.map(line => {
      // הסרת מספרים עם נקודה (1. 2. 3. וכו')
      let cleaned = line.replace(/^\d+\.\s*/, '')
      
      // הסרת אותיות עבריות עם נקודה (א. ב. ג. ד. וכו')
      cleaned = cleaned.replace(/^[א-ת]\.\s*/, '')
      
      // הסרת מספרים עם סוגריים (1) 2) 3) וכו')
      cleaned = cleaned.replace(/^\d+\)\s*/, '')
      
      // הסרת אותיות עבריות עם סוגריים (א) ב) ג) ד) וכו')
      cleaned = cleaned.replace(/^[א-ת]\)\s*/, '')
      
      return cleaned.trim()
    })

    // ערבוב התשובות
    const shuffledAnswers = [...cleanAnswers].sort(() => Math.random() - 0.5)
    
    // הוספת מספור חדש לפי הסגנון שנבחר
    const finalAnswers = shuffledAnswers.map((answer, index) => {
      const hebrewLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת']
      
      switch (markingStyle) {
        case 'numbers-dots':
          return `${index + 1}. ${answer}`
        case 'letters-dots':
          return `${hebrewLetters[index]}. ${answer}`
        default:
          return `${index + 1}. ${answer}`
      }
    })

    // הצגת התוצאה
    setMixedAnswers(finalAnswers.join('\n'))
  }

  return (
    <div className="app">
      <div className="app-container">
        <h2 className="app-title">מערכת ערבוב תשובות אמריקאיות</h2>
        
        <div className="input-section">
          <label htmlFor="answers-input" className="input-label">
            הכנס את התשובות האמריקאיות (כל תשובה בשורה נפרדת):
          </label>
          <textarea
            id="answers-input"
            className="answers-textarea"
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
            placeholder="לדוגמה:&#10;1. תשובה ראשונה&#10;א. תשובה שנייה&#10;2) תשובה שלישית&#10;ב) תשובה רביעית"
            rows={8}
          />
        </div>

        <div className="marking-options">
          <button 
            className="toggle-marking-btn"
            onClick={() => setShowMarkingOptions(!showMarkingOptions)}
          >
            {showMarkingOptions ? 'הסתר אפשרויות סימון' : 'שנה סגנון סימון'}
          </button>
          
          {showMarkingOptions && (
            <>
              <label className="marking-label">בחר סגנון סימון לתשובות החדשות:</label>
              <div className="marking-buttons">
                <button 
                  className={`marking-btn ${markingStyle === 'numbers-dots' ? 'active' : ''}`}
                  onClick={() => setMarkingStyle('numbers-dots')}
                >
                  .3 .2 .1
                </button>
                <button 
                  className={`marking-btn ${markingStyle === 'letters-dots' ? 'active' : ''}`}
                  onClick={() => setMarkingStyle('letters-dots')}
                >
                  .א .ב .ג
                </button>
              </div>
            </>
          )}
        </div>

        <div className="button-group">
          <button className="mix-button" onClick={handleMixAnswers}>
            ערבב תשובות
          </button>
          
          {mixedAnswers && (
            <button className="copy-button" onClick={() => navigator.clipboard.writeText(mixedAnswers)}>
              העתק תשובות
            </button>
          )}
        </div>

        {mixedAnswers && (
          <div className="result-section">
            <h3>התשובות המעורבבות:</h3>
            <div className="mixed-answers">
              {mixedAnswers}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App