@extends('layouts.app')

@section('content')
<div class="bg-gray-100 min-h-screen flex justify-center py-10">
    <div class="w-full max-w-5xl bg-white shadow-lg grid grid-cols-3">
        <!-- Left Column -->
        <div class="bg-gray-900 text-white p-8">
            <!-- Name -->
            <h1 class="text-3xl font-bold">James Miller</h1>
            <p class="text-green-400 text-lg mt-1">IT Project Manager</p>

            <!-- Details -->
            <h2 class="uppercase mt-8 text-sm font-semibold tracking-wide">Details</h2>
            <p class="mt-3 text-sm">44 Shirley Ave.<br>West Chicago, IL 60185</p>
            <p class="mt-3 text-sm">563-458-6942</p>
            <p class="mt-1 text-green-400 text-sm">jmiller@gmail.com</p>
            <p class="mt-4 text-sm">Date / Place of birth<br>11/09/1992<br>Tampa, Florida</p>

            <!-- Skills -->
            <h2 class="uppercase mt-8 text-sm font-semibold tracking-wide">Skills</h2>
            <div class="mt-3 space-y-3">
                @php
                    $skills = [
                        ['name' => 'XHTML', 'level' => 4],
                        ['name' => 'JavaScript', 'level' => 5],
                        ['name' => 'CSS', 'level' => 3],
                        ['name' => 'Visual Basic', 'level' => 3],
                    ];
                @endphp
                @foreach($skills as $skill)
                <div>
                    <p class="text-sm">{{ $skill['name'] }}</p>
                    <div class="flex space-x-1 mt-1">
                        @for($i=0;$i<5;$i++)
                            <span class="w-3 h-3 rounded-full 
                            {{ $i < $skill['level'] ? 'bg-green-400' : 'bg-gray-500' }}"></span>
                        @endfor
                    </div>
                </div>
                @endforeach
            </div>

            <!-- Languages -->
            <h2 class="uppercase mt-8 text-sm font-semibold tracking-wide">Languages</h2>
            <div class="mt-3 space-y-3">
                @php
                    $languages = [
                        ['name' => 'English', 'level' => 5],
                        ['name' => 'French', 'level' => 3],
                        ['name' => 'Spanish', 'level' => 2],
                    ];
                @endphp
                @foreach($languages as $lang)
                <div>
                    <p class="text-sm">{{ $lang['name'] }}</p>
                    <div class="flex space-x-1 mt-1">
                        @for($i=0;$i<5;$i++)
                            <span class="w-3 h-3 rounded-full 
                            {{ $i < $lang['level'] ? 'bg-green-400' : 'bg-gray-500' }}"></span>
                        @endfor
                    </div>
                </div>
                @endforeach
            </div>

            <!-- Hobbies -->
            <h2 class="uppercase mt-8 text-sm font-semibold tracking-wide">Hobbies</h2>
            <ul class="mt-3 text-sm space-y-1">
                <li>Web Design</li>
                <li>Shopping</li>
                <li>Traveling</li>
            </ul>
        </div>

        <!-- Right Column -->
        <div class="col-span-2 p-8">
            <!-- Professional Summary -->
            <h2 class="text-xl font-semibold flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                Professional summary
            </h2>
            <p class="mt-3 text-gray-700 text-sm leading-relaxed">
                A highly resourceful, flexible, innovative, and enthusiastic Project Manager. Possessing considerable experience managing projects from beginning to end, defining the project plan, timeline, scope and executing the analysis before providing detailed specifications. I have an impressive track record of delivering major operational improvement and orchestrating people, schedules and resources for optimum productivity, efficiency and quality. Keen to find a challenging position within an ambitious company where I will be able to continue increasing my project management skills.
            </p>

            <!-- Employment History -->
            <h2 class="text-xl font-semibold mt-8 flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11v6c0 1.657 1.343 3 3 3s3-1.343 3-3v-6zM18 11c0-1.657-1.343-3-3-3s-3 1.343-3 3v6c0 1.657 1.343 3 3 3s3-1.343 3-3v-6z"></path></svg>
                Employment history
            </h2>
            <div class="mt-3">
                <p class="font-semibold text-gray-800">IT Project Manager at Telecommunicado Ltd <span class="float-right text-gray-500">Birmingham</span></p>
                <p class="text-sm text-gray-500">May 2017 - Current</p>
                <ul class="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                    <li>Lead a team of technical staff</li>
                    <li>Planning, procurement and execution of projects</li>
                </ul>
            </div>
            <div class="mt-5">
                <p class="font-semibold text-gray-800">IT Technician at International Mobilites <span class="float-right text-gray-500">Birmingham</span></p>
                <p class="text-sm text-gray-500">October 2015 - April 2016</p>
                <ul class="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                    <li>Operate and maintain information systems</li>
                    <li>Facilitating system utilization</li>
                </ul>
            </div>

            <!-- Education -->
            <h2 class="text-xl font-semibold mt-8 flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422A12.083 12.083 0 0112 20.944a12.083 12.083 0 01-6.16-10.366L12 14z"></path></svg>
                Education
            </h2>
            <ul class="mt-3 space-y-3 text-sm text-gray-700">
                <li>
                    <span class="font-semibold">BSc Computer Science (2:1)</span> - University of Birmingham <br>
                    <span class="text-gray-500">September 2014 - May 2016</span>
                </li>
                <li>
                    <span class="font-semibold">A-Levels: ICT (B), Maths (C), Biology (B)</span> - Washwood Heath Technology College <br>
                    <span class="text-gray-500">September 2011 - May 2014</span>
                </li>
                <li>
                    <span class="font-semibold">10 GCSEs including Maths (A), Business Studies (B), ICT (C)</span> - Bournville School Secondary School <br>
                    <span class="text-gray-500">September 1999 - May 2011</span>
                </li>
            </ul>

            <!-- Honors -->
            <h2 class="text-xl font-semibold mt-8 flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                Honors
            </h2>
            <p class="mt-3 text-sm text-gray-700">
                Board Member Mensa, Birmingham <br>
                <span class="text-gray-500">June 2015 - June 2017</span>
            </p>
        </div>
    </div>
</div>
@endsection
