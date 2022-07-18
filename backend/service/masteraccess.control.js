const checkMasterDataAccess = (req, res, next) => {
  // console.dir(req.originalUrl) // '/admin/new?sort=desc'
  //   console.dir(req.baseUrl) // '/admin'
  //   console.dir(req.baseUrl+req.path) // '/new'

  // console.log(req.query);
  let institutionId = "";
  let page = "all";
  if (
    req.query.institutionId !== undefined &&
    req.query.institutionId !== "undefined"
  ) {
    institutionId = req.query.institutionId;
    // console.log(req.query.page);
    page = req.query.page;
  }
  let ConfigurationalMasterIds = [];
  let GenericMasterIds = [];

  if (req.baseUrl + req.path === "/api/master/list") {
    switch (page) {
      case "addstudent": // add student application
        ConfigurationalMasterIds = [
          "config_class",
          "config_depart",
          "config_academic",
          "config_board",
        ];
        GenericMasterIds = [
          "gen_gender",
          "gen_religion",
          "gen_city",
          "gen_country",
          "gen_state",
        ];
        break;
      case "addfeestruc": // create fee structure
        ConfigurationalMasterIds = [
          "config_class",
          "config_depart",
          "config_feetype",
          "config_academic",
          "config_board",
        ];
        GenericMasterIds = [];
        break;
      case "addmapsub": // add map subject
        ConfigurationalMasterIds = [
          "config_class",
          "config_depart",
          "config_academic",
          "config_section",
          "config_board",
        ];
        GenericMasterIds = [];
        break;
      case "addemployee": // add employee
        ConfigurationalMasterIds = ["config_depart", "config_location"];
        GenericMasterIds = [
          "gen_gender",
          "gen_mstatus",
          "gen_role",
          "gen_emptype",
          "gen_empstatus",
          "gen_souofhire",
          "gen_repoto",
        ];
        break;
      case "addasset": // add asset
        ConfigurationalMasterIds = ["config_category"];
        GenericMasterIds = [];
        break;
      case "addexp": // add expense
        ConfigurationalMasterIds = ["config_exptype", "config_paymode"];
        GenericMasterIds = [];
        break;
      case "addtimetable": // add timetable
        ConfigurationalMasterIds = [
          "config_class",
          "config_depart",
          "config_section",
          "config_academic",
        ];
        GenericMasterIds = [];
        break;

      default:
        break;
    }
  }
  // switch (institutionId) {
  // case "test123456":
  // if (req.baseUrl + req.path === "/api/master/list") {
  //   switch (page) {
  //     case "addstudent": // add student application
  //       ConfigurationalMasterIds = [
  //         "config_class",
  //         "config_depart",
  //         "config_academic",
  //         "config_board",
  //       ];
  //       GenericMasterIds = [
  //         "gen_gender",
  //         "gen_religion",
  //         "gen_city",
  //         "gen_country",
  //       ];
  //       break;
  //     case "addfeestruc": // create fee structure
  //       ConfigurationalMasterIds = [
  //         "config_class",
  //         "config_depart",
  //         "config_feetype",
  //         "config_academic",
  //         "config_board",
  //       ];
  //       GenericMasterIds = [];
  //       break;
  //     case "addmapsub": // add map subject
  //       ConfigurationalMasterIds = [
  //         "config_class",
  //         "config_depart",
  //         "config_academic",
  //         "config_section",
  //         "config_board",
  //       ];
  //       GenericMasterIds = [];
  //       break;
  //     case "addemployee": // add employee
  //       ConfigurationalMasterIds = ["config_depart", "config_location"];
  //       GenericMasterIds = [
  //         "gen_gender",
  //         "gen_mstatus",
  //         "gen_role",
  //         "gen_emptype",
  //         "gen_empstatus",
  //         "gen_souofhire",
  //         "gen_repoto",
  //       ];
  //       break;

  //     default:
  //       break;
  //   }
  // }
  // break;

  // default:
  // break;
  // }

  req.ConfigurationalMasterIds = ConfigurationalMasterIds;
  req.GenericMasterIds = GenericMasterIds;
  req.page = page;
  next();
};

module.exports = { checkMasterDataAccess };
