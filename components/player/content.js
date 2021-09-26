function Content({ title, content, reference }) {
  return (
    <>
      <h1 className="text-3xl text-center font-black font-extrabold	tracking-wide">
        {title}
      </h1>

      <p className="text-l py-2	text-center  font-mono  font-extrabold text-white-800 ">
        {content}
      </p>
      <p className="text-l pb-2	text-center  font-mono  font-extrabold text-white-800 ">
        {reference}
      </p>
    </>
  );
}

export default Content;
