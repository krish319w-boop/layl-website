export default function SectionTitle({kicker,title,text}:{kicker?:string,title:string,text?:string}){
  return <div className="sectionTitle">
    {kicker && <p className="kicker">{kicker}</p>}
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
}
