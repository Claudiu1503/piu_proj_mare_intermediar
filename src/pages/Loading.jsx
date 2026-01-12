export default function Loading(){
  return (
    <div className="center" style={{minHeight:'60vh', flexDirection:'column', gap:10}} aria-live="polite" aria-busy="true">
      <div className="brand-logo" aria-hidden style={{width:56, height:56, display:'grid', placeItems:'center', animation:'spin 1.2s linear infinite'}}>PIU</div>
      <div>Se încarcă platforma PIU...</div>
      <style>{`@keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
