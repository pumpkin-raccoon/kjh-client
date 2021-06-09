import styles from './SurveyLayout.module.scss'

const SurveyLayout = (props: {
  children: React.ReactNode
  title: string
  leftButton?: {
    type: 'arrow'
    onClick: () => void
  }
  rightButton?: {
    type: 'square'
    element: React.ReactNode | string
    onClick: () => void
  }
}) => {
  const {
    children,
    title,
    leftButton,
    rightButton
  } = props

  return (
    <div className={ styles.SurveyLayout }>
      <header className={ styles.header }>
        {leftButton &&
          <button className={ `${styles.side_button} ${styles.left_button} ${styles.arrow_button}` }>
            {leftButton.type === 'arrow' &&
              <img 
                alt='move back' 
                src='/images/survey/back-gray.webp'
              />
            }
          </button>
        }

        <h1 className={ styles.title }>
          {title}
        </h1>

        {rightButton &&
          <button className={ `${styles.side_button} ${styles.right_button} ${styles.square_button}` }>
            {typeof rightButton.element === 'string'
              ? <p>{rightButton.element}</p>
              : rightButton.element
            }
          </button>
        }
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}

export default SurveyLayout
