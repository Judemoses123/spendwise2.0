import style from './Section.module.css';
const Section = (props) => {
  return (
    <div
    className={style.main}
    >
      {props.children}
    </div>
  );
};
export default Section;
