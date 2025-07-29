import React from 'react';

export default function Main () {
    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#151e1c] dark group/design-root overflow-x-hidden font-sans">
            <div className="layout-container flex h-full grow flex-col">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    {/* Sidebar */}
                    <div className="layout-content-container flex flex-col w-80">
                        <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#151e1c] p-4">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-white text-base font-medium leading-normal">Tourify</h1>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#2b403c]">
                                        <div className="text-white" data-icon="House" data-size="24px" data-weight="fill">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-medium leading-normal">Dashboard</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-3 py-2">
                                        <div className="text-white" data-icon="Calendar" data-size="24px" data-weight="regular">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-medium leading-normal">Events</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-3 py-2">
                                        <div className="text-white" data-icon="UsersThree" data-size="24px" data-weight="regular">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-medium leading-normal">Group Tours</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-3 py-2">
                                        <div className="text-white" data-icon="Bookmark" data-size="24px" data-weight="regular">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-medium leading-normal">Bookings</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-3 py-2">
                                        <div className="text-white" data-icon="User" data-size="24px" data-weight="regular">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-medium leading-normal">Customers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <div className="text-white" data-icon="Gear" data-size="24px" data-weight="regular">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-white text-sm font-medium leading-normal">Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Dashboard</p>
                        </div>

                        {/* Statistics Cards */}
                        <div className="flex flex-wrap gap-4 p-4">
                            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2b403c]">
                                <p className="text-white text-base font-medium leading-normal">Total Income</p>
                                <p className="text-white tracking-light text-2xl font-bold leading-tight">$120,000</p>
                            </div>
                            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2b403c]">
                                <p className="text-white text-base font-medium leading-normal">Expenses</p>
                                <p className="text-white tracking-light text-2xl font-bold leading-tight">$45,000</p>
                            </div>
                            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2b403c]">
                                <p className="text-white text-base font-medium leading-normal">Net Profit</p>
                                <p className="text-white tracking-light text-2xl font-bold leading-tight">$75,000</p>
                            </div>
                        </div>

                        {/* More Statistics */}
                        <div className="flex flex-wrap gap-4 p-4">
                            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2b403c]">
                                <p className="text-white text-base font-medium leading-normal">Event Tickets Booked This Month</p>
                                <p className="text-white tracking-light text-2xl font-bold leading-tight">350</p>
                            </div>
                            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2b403c]">
                                <p className="text-white text-base font-medium leading-normal">Group Tour Tickets Booked This Month</p>
                                <p className="text-white tracking-light text-2xl font-bold leading-tight">200</p>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="flex flex-wrap gap-4 px-4 py-6">
                            <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#3e5b55] p-6">
                                <p className="text-white text-base font-medium leading-normal">Net Profit</p>
                                <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">$75,000</p>
                                <div className="flex gap-1">
                                    <p className="text-[#9ebdb7] text-base font-normal leading-normal">Last 6 Months</p>
                                    <p className="text-[#0bda4d] text-base font-medium leading-normal">+15%</p>
                                </div>
                                <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                                    <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                        <path
                                            d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                                            fill="url(#paint0_linear_1131_5935)"
                                        />
                                        <path
                                            d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                                            stroke="#9ebdb7"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#2b403c" />
                                                <stop offset="1" stopColor="#2b403c" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="flex justify-around">
                                        <p className="text-[#9ebdb7] text-[13px] font-bold leading-normal tracking-[0.015em]">Jan</p>
                                        <p className="text-[#9ebdb7] text-[13px] font-bold leading-normal tracking-[0.015em]">Feb</p>
                                        <p className="text-[#9ebdb7] text-[13px] font-bold leading-normal tracking-[0.015em]">Mar</p>
                                        <p className="text-[#9ebdb7] text-[13px] font-bold leading-normal tracking-[0.015em]">Apr</p>
                                        <p className="text-[#9ebdb7] text-[13px] font-bold leading-normal tracking-[0.015em]">May</p>
                                        <p className="text-[#9ebdb7] text-[13px] font-bold leading-normal tracking-[0.015em]">Jun</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Popular Items Section */}
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Popular Items</h2>
                        <div className="pb-3">
                            <div className="flex border-b border-[#3e5b55] px-4 gap-8">
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#ceede7] text-white pb-[13px] pt-4" href="#">
                                    <p className="text-white text-sm font-bold leading-normal tracking-[0.015em]">Events</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#9ebdb7] pb-[13px] pt-4" href="#">
                                    <p className="text-[#9ebdb7] text-sm font-bold leading-normal tracking-[0.015em]">Group Tours</p>
                                </a>
                            </div>
                        </div>

                        {/* Popular Items Cards */}
                        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex items-stretch p-4 gap-3">
                                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                                    <div className="w-full aspect-video rounded-xl overflow-hidden">
                                        <img
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA55j0C7Ayl_rpMjrITJlvZ0zAV0l-lfLQfADQrMBR8RNYCJkXZzGPoAMlbqrLpCdjmo8WFnkVv6Au3Vu3Nt2z9YdwjA8opvSbV5WzRJH-wEoPuufD4UlYkKrNKnjJ3zRpZYsiIcUdsSF-1OUcdufPoqCGfekiHUYp6rNwDT939dbqYGUbt3vLc3TKkiHyA79qL4X21ezIXMdyTc3YZi1DmuyQwvPu6bk2E_bYEM4mykFgaLK0W2ucGNCcJM9O1J2ORw5bz3hBtKLY"
                                            alt="Live Music Festival"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white text-base font-medium leading-normal">Live Music Festival</p>
                                        <p className="text-[#9ebdb7] text-sm font-normal leading-normal">Experience the thrill of live music with top artists.</p>
                                    </div>
                                </div>
                                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                                    <div className="w-full aspect-video rounded-xl overflow-hidden">
                                        <img
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-KcT7cBSj7LSF4NVdZEveqmNjltY5gvwlqwiRKli2b8rlRktdK4thyJJDr5JuLKj0uAcQIg8G9gQoOx9f1lfivWoCs_weZRPj1EuTZ_Owp0r2EfNPwdKFIArhAm2kDgazN7AmIMI3c7ZZv19slCj8vz_PKKSkGQO68kqTGU9aRrhP7fP12szUH6oARAKwskyh3C6xVRS6w3LNTNiNihLx38UsagxejSlomDhpFObUDZ-77PYXmswIJvcwP2yLeMQsn_Vicc3h0xA"
                                            alt="Culinary Delights Expo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white text-base font-medium leading-normal">Culinary Delights Expo</p>
                                        <p className="text-[#9ebdb7] text-sm font-normal leading-normal">Indulge in a variety of cuisines from around the world.</p>
                                    </div>
                                </div>
                                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                                    <div className="w-full aspect-video rounded-xl overflow-hidden">
                                        <img
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDapy81jQAGhyEZAFleT7OxwoPfYFkdY9yTAvCT_kNT8onwkIVvdtMkHH0AcZ-3H_FE8ALVdwOdA_-HBwZyruGodWcI_oXEzCq4WEdTKu9QyY9XItlcJlRJ5qA3RX5Z7EOEDW351anFoTLup6g6lBDD0O6Y2VXkmrt8DiBs7BvO6IrN1-VYibH-5pv24OpYo5Co5Vu5hGmWwzfN_EMKbNacDHgK7f0zUoDW6BI5e_cntRLaJ-NbRYiugicwaFmk5LWEIyys8_V-j0"
                                            alt="Modern Art Showcase"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white text-base font-medium leading-normal">Modern Art Showcase</p>
                                        <p className="text-[#9ebdb7] text-sm font-normal leading-normal">Explore contemporary art from emerging and established artists.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Frequent Bookers Table */}
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Frequent Bookers</h2>
                        <div className="px-4 py-3">
                            <div className="flex overflow-hidden rounded-xl border border-[#3e5b55] bg-[#151e1c]">
                                <table className="flex-1">
                                    <thead>
                                    <tr className="bg-[#1f2e2b]">
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Name</th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Email</th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Bookings</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-t border-t-[#3e5b55]">
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">Emily Harper</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">emily.harper@email.com</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">15</td>
                                    </tr>
                                    <tr className="border-t border-t-[#3e5b55]">
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">Owen Mitchell</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">owen.mitchell@email.com</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">12</td>
                                    </tr>
                                    <tr className="border-t border-t-[#3e5b55]">
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">Chloe Reynolds</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">chloe.reynolds@email.com</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">10</td>
                                    </tr>
                                    <tr className="border-t border-t-[#3e5b55]">
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">Ethan Hayes</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">ethan.hayes@email.com</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">8</td>
                                    </tr>
                                    <tr className="border-t border-t-[#3e5b55]">
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">Isabella Reed</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">isabella.reed@email.com</td>
                                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb7] text-sm font-normal leading-normal">7</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
