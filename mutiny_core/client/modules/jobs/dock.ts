import { CreateNotification } from "classes/Notification";
import { faker } from "@faker-js/faker";
import { Delay } from "modules/utils/delay";

let employees = {
  boss: {
    first: "",
    last: "",
  },
  male_employee: {
    first: "",
    last: "",
  },
  female_employee: {
    first: "",
    last: "",
  },
};

let onDuty = false;

global.exports.ox_target.addSphereZone({
  coords: {
    x: -412.5494384765625,
    y: -2284.602294921875,
    z: 7.99853515625,
  },
  radius: 1,
  options: [
    {
      label: "Start Dockwork",
      name: "start_dockwork",
      icon: "fa-solid fa-anchor fa-beat-fade",
      canInteract: () => {
        if (!onDuty) return true;
      },
      onSelect: async (target: any) => {
        onDuty = !onDuty;
        if (employees.boss.first === "") {
          GenerateJobEmployees();
        } else if (employees.boss.first !== "") {
          ResetEmployees();
        }
        new CreateNotification({
          title: `${employees.boss.first} ${employees.boss.last}`,
          text: "Ill see what jobs I got for ya, wait around for a bit",
          duration: 5000,
          progress: "auto",
        });
        const timer = Math.floor(Math.random() * 5000) + 5000;
        await Delay(timer);
        if (timer % 2 === 0) {
          const employee = `${employees.female_employee.first} ${employees.female_employee.last}`;
          emitNet("selectDockwork", timer, employee);
        } else {
          const employee = `${employees.male_employee.first} ${employees.male_employee.last}`;
          emitNet("selectDockwork", timer, employee);
        }
      },
    },
    {
      label: "Stop Dockwork",
      name: "stop_dockwork",
      icon: "fa-solid fa-anchor fa-beat-fade",
      canInteract: () => {
        if (onDuty) return true;
      },
      onSelect: async (target: any) => {
        onDuty = !onDuty;
        new CreateNotification({
          title: `${employees.boss.first} ${employees.boss.last}`,
          text: "Get the fuck outta my sight...",
          duration: 5000,
          progress: "auto",
        });
        ResetEmployees();
      },
    },
  ],
});

function GenerateJobEmployees() {
  employees = {
    boss: {
      first: faker.person.firstName("male"),
      last: faker.person.lastName("male"),
    },
    male_employee: {
      first: faker.person.firstName("male"),
      last: faker.person.lastName("male"),
    },
    female_employee: {
      first: faker.person.firstName("female"),
      last: faker.person.lastName("female"),
    },
  };
}

function ResetEmployees() {
  employees = {
    boss: {
      first: employees.boss.first,
      last: employees.boss.last,
    },
    male_employee: {
      first: faker.person.firstName("male"),
      last: faker.person.lastName("male"),
    },
    female_employee: {
      first: faker.person.firstName("female"),
      last: faker.person.lastName("female"),
    },
  };
}

function JobNotification() {
  //  new CreateNotification({
  //    title: `${employees.boss.first} ${employees.boss.last}`,
  //    text: `Alright, I got a job for you, head on over to ${employees.female_employee.first} ${employees.female_employee.last} and she will get you started`,
  //    duration: 5000,
  //    progress: "auto",
  //  });
  // new CreateNotification({
  //   title: `${employees.boss.first} ${employees.boss.last}`,
  //   text: `Alright, I got a job for you, head on over to ${employees.male_employee.first} ${employees.male_employee.last} and he will get you started`,
  //   duration: 5000,
  //   progress: "auto",
  // });
}
