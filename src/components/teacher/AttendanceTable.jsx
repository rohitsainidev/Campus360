import { Check, X, User } from 'lucide-react';

export default function AttendanceTable({
  students = [],
  attendanceState = {}, // { [studentId]: 'present' | 'absent' }
  onToggleStatus,
}) {
  if (!students || students.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <caption className="sr-only">Student Attendance Roster</caption>
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th scope="col" className="px-4 py-3.5">
                Roll No
              </th>
              <th scope="col" className="px-4 py-3.5">
                Student Name & ID
              </th>
              <th scope="col" className="px-4 py-3.5 text-center">
                Current Status
              </th>
              <th scope="col" className="px-4 py-3.5 text-right">
                Mark Attendance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
            {students.map((student) => {
              const status = attendanceState[student.id]; // 'present' | 'absent' | undefined
              const isPresent = status === 'present';
              const isAbsent = status === 'absent';

              return (
                <tr
                  key={student.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    isAbsent ? 'bg-red-50/20' : isPresent ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono font-medium text-[#64748B]">
                    {student.rollNo || student.id}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-slate-100 text-[#4F46E5] flex items-center justify-center font-bold text-xs shrink-0">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-[#0F172A] block leading-tight">
                          {student.name}
                        </span>
                        <span className="text-[11px] text-[#64748B] block font-mono">
                          {student.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-center">
                    {isPresent ? (
                      <span className="text-xs font-semibold text-emerald-600">
                        Present
                      </span>
                    ) : isAbsent ? (
                      <span className="text-xs font-semibold text-rose-600">
                        Absent
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">Not Marked</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-1.5 p-1 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(student.id, 'present')}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          isPresent
                            ? 'bg-[#15803D] text-white shadow-xs'
                            : 'text-[#475569] hover:text-[#15803D] hover:bg-emerald-50'
                        }`}
                        aria-pressed={isPresent}
                        aria-label={`Mark ${student.name} as Present`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Present</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleStatus(student.id, 'absent')}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          isAbsent
                            ? 'bg-[#DC2626] text-white shadow-xs'
                            : 'text-[#475569] hover:text-[#DC2626] hover:bg-red-50'
                        }`}
                        aria-pressed={isAbsent}
                        aria-label={`Mark ${student.name} as Absent`}
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Absent</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
