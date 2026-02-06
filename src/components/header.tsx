import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-700 h-16 text-white font-bold flex justify-between items-center pl-5">
      <div className="text-2xl">
        <Link href="/">Autoflex</Link>
       
    </div>
      <div className="flex gap-2 pr-3">
        <p className="hover:bg-blue-400 p-2 rounded-md cursor-pointer">
          <Link href="/registered-product">Produtos cadastrados</Link>
        </p>
        <p className="hover:bg-blue-400 p-2 rounded-md cursor-pointer">
          <Link href="raw-material">Cadastrar Materia Prima</Link>
        </p>
      </div>
    </header>
  );
};

export default Header;
