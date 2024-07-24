import style from './ProgressBar.module.scss'

interface ProgressBarProps {
    value: number
    max: number
}

function ProgressBar({value, max}: ProgressBarProps) {
    const width = (value / max) * 100;
    return (
        <div className={style.progressbar}>
            <div className={style.progressbar__fill} style={{ width: `${width}%` }}></div>
            <div className={style.progressbar__text}>{`${value}/${max}`}</div>
        </div>
    )
}

export default ProgressBar