const Navigation = [
  {
    id: 1,
    name: "Masters",
    icon: "User_cicrle_duotone",
    link: "/dashboard/master",
    children: [],
  },
  {
    id: 2,
    name: "Student",
    icon: "studenicon1",
    link: "#",
    children: [{
      name: "Enroll student application",
      link: "/dashboard/student",
    }, {
      name: "Admission", link: "/dashboard/Admission",
    }],
  },
  {
    id: 3,
    name: "Fee Management",
    icon: "FeeManagement1",
    link: "#",
    children: [
      {
        name: "create Fee Structure",
        link: "/dashboard/createfee",
      },
      {
        name: "Fee Collection",
        link: "/dashboard/feecollection",
      },
      {
        name: "Fee Reports",
        link: "/dashboard/allreports",
      },
    ],
  },
  {
    id: 4,
    name: "Add Subject",
    icon: "AddSubjectIcon",
    link: "#",
    children: [
      {
        name: "MAP Subject", link: "/dashboard/mapsubject",

      },
      {
        name: "MAP Faculty To Subjects", link: "/dashboard/mapsubjctefaculaty",

      }

    ],
  },
  {
    id: 5,
    name: "Employee",
    icon: "employee",
    link: "#",
    children: [
      {
        name: "Add Employe", link: "/dashboard/addemployee",
      },
      {
        name: "Employee List", link: "/dashboard/employelist",
      }
    ],
  },
  {
    id: 6,
    name: "Expense Management",
    icon: "ExpenseManagement",
    link: "#",
    children: [
      {
        name: "Add Expense", link: "/dashboard/addexpense",
      },
      {
        name: "Expense List", link: "/dashboard/expenselist",
      }
    ],
  },
  {
    id: 7,
    name: "Asset Management",
    icon: "Asset Management",
    link: "#",
    children: [
      {
        name: "Add Assets", link: "/dashboard/addassets",
      },
    ],
  },
  {
    id: 8,
    name: "Create TimeTable",
    icon: "AddSubjectIcon",
    link: "#",
    children: [
      {
        name: "Add TimeTable",
        link: "/dashboard/addtimetable",
      },
      {
        name: "Class /Degree TimeTable",
        link: "/dashboard/classdegreetimetable",
      },
    ],
  },
  {
    id: 9,
    name: "Student Attendance",
    icon: "AddSubjectIcon",
    link: "#",
    children: [
      {
        name: "Mark Attendance",
        link: "/dashboard/markattendence",
      },
      {
        name: "View Attendance",
        link: "/dashboard/viewattendance",
      },
    ],
  },
];

export default Navigation;
