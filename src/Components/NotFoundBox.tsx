import './NotFoundBox.css'

export default function NotFoundBox({search}: {search: (value: string) => void}) {
  return (
    <div className="not-found-box">
        <span>Your search did not match any results.</span>
        <button
          className="reset-btn"
          onClick={() => {
            search('')
          }}
        >
            Reset
        </button>
    </div>
  )
}
