// import { useState } from "react";
// import { Home, Book, Users, Settings, Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { name: "Home", icon: <Home />, link: "#" },
//     { name: "Library", icon: <Book />, link: "#" },
//     { name: "Users", icon: <Users />, link: "#" },
//     { name: "Settings", icon: <Settings />, link: "#" },
//   ];

//   return (
//     <div className="flex">
//       <aside
//         className={`h-screen bg-gray-900 text-white p-5 transition-all duration-300 ${
//           isOpen ? "w-64" : "w-20"
//         }`}
//       >
//         <div className="flex justify-between items-center">
//           <h2 className={`text-xl font-bold ${!isOpen && "hidden"}`}>Logo</h2>
//           <Button
//             variant="ghost"
//             onClick={toggleSidebar}
//             className="text-white"
//           >
//             {isOpen ? <X /> : <Menu />}
//           </Button>
//         </div>
//         <nav className="mt-5">
//           {menuItems.map((item, index) => (
//             <a
//               key={index}
//               href={item.link}
//               className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
//             >
//               {item.icon}
//               <span className={`${!isOpen && "hidden"}`}>{item.name}</span>
//             </a>
//           ))}
//         </nav>
//       </aside>
//       <main className="flex-1 p-5">Your Content Here</main>
//     </div>
//   );
// };

// export default Sidebar;
