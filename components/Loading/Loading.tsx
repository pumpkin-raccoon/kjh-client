import styles from './Loading.module.scss'
import { loadingState } from 'states/loading'
import { useRecoilValue } from 'recoil'

const Loading = () => {
  const loading = useRecoilValue(loadingState)

  if (!loading.isLoading) {
    return <></>
  }

  return (
    <div className={ styles.Loading }>
      <div className={ styles.circle }>
        <div className={ styles.loader }>
          <span className={ styles.first } />
          <span className={ styles.second } />
          <span className={ styles.third } />
        </div>
        <span className={ styles.title }>
          {loading.title || '로딩중'}
        </span>
      </div>

      {loading.message &&
        <div className={ styles.message }>
          {loading.message}
        </div>
      }
    </div>
  )
}

export default Loading
