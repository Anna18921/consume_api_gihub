interface IFooter {
  position?: string;
}
const Footer = ({ position = '' }: IFooter) => {
  return (
    <footer className={position}>
      <div className="row justify-content-center ">
        <p className="text-light">Copyright &copy;2021 Anna Rafaela</p>
      </div>
    </footer>
  );
};

export default Footer;
