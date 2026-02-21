"use client";

import { FaGraduationCap, FaLaptopHouse } from "react-icons/fa";
import Link from "next/link";
import { AiFillDashboard } from "react-icons/ai";
import { useState } from "react";
import { LuUniversity } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";
import { MdAnnouncement } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbPlayFootball } from "react-icons/tb";

export default function SideBar() {
    const [active, setActive] = useState<string>('dashboard');
    const [isHallsOpen, setHallsIsOpen] = useState<Boolean>(false);
    const [isLapsOpen, setLapsIsOpen] = useState<Boolean>(false);
    const [isFutsalOpen, setFutsalIsOpen] = useState<Boolean>(false);
    return (
        <div className="h-screen w-full bg-[#195FA7] text-white">
            <div className="flex items-center space-x-3 border-b border-gray-50/30 p-4 mb-4">
                <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center">
                <FaGraduationCap size={30} color="#195FA7" />
                </div>
                <div className="flex flex-col align-start">
                <h1 className="font-bold text-[18px]">
                    Campus Hub
                </h1>
                <p className="text-sm text-gray-200">
                    Admin - Dashboard
                </p>
                </div>
            </div>
            <nav>
                <ul className="flex flex-col text-[18px]">
                    <li onClick={() => setActive('dashboard')} className={`flex gap-2 py-2 px-6 hover:bg-gray-50/20 border-l-4 border-[#195FA7] hover:border-l-4 hover:border-white ${active === 'dashboard' ? 'border-l-4 border-white bg-gray-50/20' : ''}`}>
                        <AiFillDashboard size={20} />
                        <Link href="#">Dashboard</Link>
                    </li>
                    <li onClick={() => { 
                        setActive('laps')
                        setLapsIsOpen(!isLapsOpen)
                        setFutsalIsOpen(false)
                        setHallsIsOpen(false)
                    }} className={`flex items-center justify-between gap-2 py-2 px-6 hover:bg-gray-50/20 border-l-4 border-[#195FA7] hover:border-l-4 hover:border-white ${active === 'laps' ? 'border-l-4 border-white bg-gray-50/20' : ''}`}>
                        <div className="flex items-center gap-2">
                            <FaLaptopHouse size={20} />
                            <Link href="#">Laps</Link>
                        </div>
                        {isLapsOpen ? <IoIosArrowUp size={20} onClick={() => setLapsIsOpen(!isLapsOpen)} /> : <IoIosArrowDown size={20} onClick={() => setLapsIsOpen(!isLapsOpen)} />}
                    </li>
                    <ul className={`${isLapsOpen ? 'flex flex-col items-center justify-center gap-2 text-[16px] py-2' : 'hidden'}`}>
                        <li className="flex gap-2 px-2 text-gray-300 hover:text-white border-l-2 border-[#195FA7] hover:border-l-2 hover:border-white">
                            <Link href="#">Add Schedule</Link>
                        </li>
                        <li className="flex gap-2 px-2 text-gray-300 hover:text-white border-l-2 border-[#195FA7] hover:border-l-2 hover:border-white">
                            <Link href="#">My Schedules</Link>
                        </li>
                    </ul>
                    <li onClick={() => { 
                        setActive('halls')
                        setHallsIsOpen(!isHallsOpen)
                        setFutsalIsOpen(false)
                        setLapsIsOpen(false)
                    }} className={`flex items-center justify-between gap-2 py-2 px-6 hover:bg-gray-50/20 border-l-4 border-[#195FA7] hover:border-l-4 hover:border-white ${active === 'halls' ? 'border-l-4 border-white bg-gray-50/20' : ''}`}>
                        <div className="flex items-center gap-2">
                            <LuUniversity size={20} />
                            <Link href="#">Halls</Link>
                        </div>
                        {isHallsOpen ? <IoIosArrowUp size={20} onClick={() => setHallsIsOpen(!isHallsOpen)} /> : <IoIosArrowDown size={20} onClick={() => setHallsIsOpen(!isHallsOpen)} />}

                    </li>
                    <ul className={`${isHallsOpen ? 'flex flex-col items-center justify-center gap-2 text-[16px] py-2' : 'hidden'}`}>
                        <li className="flex gap-2 px-2 text-gray-300 hover:text-white border-l-2 border-[#195FA7] hover:border-l-2 hover:border-white">
                            <Link href="#">Add Schedule</Link>
                        </li>
                        <li className="flex gap-2 px-2 text-gray-300 hover:text-white border-l-2 border-[#195FA7] hover:border-l-2 hover:border-white">
                            <Link href="#">My Schedules</Link>
                        </li>
                    </ul>
                    <li onClick={() => { 
                        setActive('futsal')
                        setFutsalIsOpen(!isFutsalOpen)
                        setLapsIsOpen(false)
                        setHallsIsOpen(false)
                    }} className={`flex items-center justify-between gap-2 py-2 px-6 hover:bg-gray-50/20 border-l-4 border-[#195FA7] hover:border-l-4 hover:border-white ${active === 'futsal' ? 'border-l-4 border-white bg-gray-50/20' : ''}`}>
                        <div className="flex items-center gap-2">
                            <TbPlayFootball size={20} />
                            <Link href="#">Futsal</Link>
                        </div>
                        {isFutsalOpen ? <IoIosArrowUp size={20} onClick={() => setFutsalIsOpen(!isFutsalOpen)} /> : <IoIosArrowDown size={20} onClick={() => setFutsalIsOpen(!isFutsalOpen)} />}
                    </li>
                    <ul className={`${isFutsalOpen ? 'flex flex-col items-center justify-center gap-2 text-[16px] py-2' : 'hidden'}`}>
                        <li className="flex gap-2 px-2 text-gray-300 hover:text-white border-l-2 border-[#195FA7] hover:border-l-2 hover:border-white">
                            <Link href="#">Add Schedule</Link>
                        </li>
                        <li className="flex gap-2 px-2 text-gray-300 hover:text-white border-l-2 border-[#195FA7] hover:border-l-2 hover:border-white">
                            <Link href="#">My Schedules</Link>
                        </li>
                    </ul>
                    <li onClick={() => setActive('create')} className={`flex gap-2 py-2 px-6 hover:bg-gray-50/20 border-l-4 border-[#195FA7] hover:border-l-4 hover:border-white ${active === 'create' ? 'border-l-4 border-white bg-gray-50/20' : ''}`}>
                        <GrAnnounce size={20} />
                        <Link href="#">Create</Link>
                    </li>
                    <li onClick={() => setActive('announcements')} className={`flex gap-2 py-2 px-6 hover:bg-gray-50/20 border-l-4 border-[#195FA7] hover:border-l-4 hover:border-white ${active === 'announcements' ? 'border-l-4 border-white bg-gray-50/20' : ''}`}>
                        <MdAnnouncement size={20} />
                        <Link href="#">Announcements</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}