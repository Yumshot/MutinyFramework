export let EXAMPLE_USER = {
  character_data: {
    id: 0,
    first_name: "John",
    last_name: "Doe",
    birthdate: ["02", "18", "1993"],
    job: "UNEMPLOYED",
    sex: false,
    model: "A_M_Y_Business_02",
  },
  admin_data: {
    permissions: "ADMIN",
    identifiers: ["license:cfxk_1URanycHbxT0YcUpE0QXB_3H4pMk", "ip:127.0.0.1"],
    ban_data: {
      is_banned: false,
      ban_info: [{}],
    },
  },
};

export type EXAMPLE_USER_TYPE = {
  character_data: {
    id?: number;
    first_name?: string;
    last_name?: string;
    birthdate?: string[];
    sex?: boolean;
    model?: string;
  };
  admin_data: {
    permissions: string;
    identifiers: string[];
    ban_data: {
      is_banned: boolean;
      ban_info?: [];
    };
  };
};
