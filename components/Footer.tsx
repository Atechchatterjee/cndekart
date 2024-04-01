export default function Footer() {
  return (
    <div className="absolute flex w-full mt-[10rem] h-[5rem] text-white bg-primary">
      <div className="flex w-[100rem] m-auto items-center">
        <p className="justify-start w-full">
          © 2018. All Rights Reserved by CND Engineering Pvt. Ltd.
        </p>
        <div className="w-full flex gap-5 justify-end">
          <a href="/">Facebook</a>
          <a href="/">Twitter</a>
          <a href="/">Email</a>
        </div>
      </div>
    </div>
  );
}
