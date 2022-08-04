import { useCanvasData } from '../../store/hooks'
import styles from './index.less'
import Cmp from './Cmp'

export default function Center(props) {
  const canvas = useCanvasData()

  const { style, cmps } = canvas

  return (
    <div className={styles.main}>
      <div className={styles.canvas}>
        {cmps.map((cmp) => (
          <Cmp key={cmp.key} cmp={cmp} />
        ))}
      </div>
    </div>
  )
}
