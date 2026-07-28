export default function Footer(){

  return (
    <footer className="bg-gray-900 text-white py-8 mt-20">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-xl font-bold">
          GreenMart
        </h2>

        <p className="text-gray-400 mt-2">
          Fresh groceries delivered to your door.
        </p>

        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} GreenMart. All rights reserved.
        </p>

      </div>

    </footer>
  );
}