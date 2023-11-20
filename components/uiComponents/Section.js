const Section=(props)=>{
    return(
        <div style={{width:'100%', padding:'5rem 1rem 5rem 1rem', boxSizing:'border-box', position:'relative'}}>
            {props.children}
        </div>
    )
}
export default Section;