const organizations = [
    {
        id: 1,
        name: "FUNIBER",
        abbreviation: "FBR",
        degree_abbreviation: "FBR",
        origin: null,
        rest_path: null,
        token: "",
        additional_data: null,
        translations: {"en_US": "Iberoamerican University Foundation", "fr_FR": "Fondation Universitaire Ibéro-américaine", "it_IT": "Fondazione Universitaria Iberoamericana", "pt_BR": "Fundação Universitária Iberoamericana", "pt_PT": "Fundação Universitária Iberoamericana", "zh_CN": "伊比利亚美洲大学基金会"},
        modality: null,
        parent: null,
        importance: null,
        available: 0
    },
    {
        id: 2,
        name: "UNIB",
        abbreviation: "UNIB",
        degree_abbreviation: "UNIB",
        origin: "https://campus.unib.org",
        rest_path: "/webservice/rest/server.php",
        token: "637dab935fc582901b644c9485f88292",
        additional_data: {"config_env": {"role_student": {"shortname": "student", "context_id": "1", "context_level": "system"}, "name_groupings": "Automatically created groups", "uuid_groupings": "f0ba1967-aa84-4f4a-8daa-560d81a1c8d0", "groupings_default": [{"name": "lang", "description": "", "abbreviation": "lang"}, {"name": "org", "description": "", "abbreviation": "org"}, {"name": "term", "description": "", "abbreviation": "term"}, {"name": "program", "description": "", "abbreviation": "program"}], "route_delete_group": "/group/delete.php?courseid=_COURSE_ID&groups=_GROUP_ID", "separator_id_number": "||", "description_groupings": "Externally Created Groups", "condition_for_registration": {"active": true, "programs": true, "incription": {"started_at": "2024-01-01T00:00:00.000Z"}}}},
        translations: {"en_US": "International Ibero-American University", "pt_BR": "Universidade Internacional Iberoamericana", "pt_PT": "Universidade Internacional Iberoamericana"},
        modality: "virtual",
        parent: 1,
        importance: 1,
        available: 1
    },
    {
        id: 3,
        name: "UNEATLANTICO-VIRTUAL",
        abbreviation: "UEA",
        degree_abbreviation: "UEA",
        origin: "",
        rest_path: "/webservice/rest/server.php",
        token: "",
        additional_data: null,
        translations: {"en_US": "European University of the Atlantic", "fr_FR": "Université européenne de l'Atlantique", "it_IT": "Università Europea dell'Atlantico", "pt_BR": "Universidade Europeia do Atlântico", "pt_PT": "Universidade Europeia do Atlântico", "zh_CN": "大西洋欧洲大学"},
        modality: "virtual",
        parent: 1,
        importance: 2,
        available: 0
    },
    {
        id: 4,
        name: "UNINCOL",
        abbreviation: "UNINCOL",
        degree_abbreviation: "UNINCOL",
        origin: "https://campus.unincol.edu.co",
        rest_path: "/webservice/rest/server.php",
        token: "",
        additional_data: null,
        translations: {"en_US": "International University Foundation of Colombia", "pt_BR": "Fundação Universitária Internacional da Colômbia", "pt_PT": "Fundação Universitária Internacional da Colômbia"},
        modality: "virtual",
        parent: 1,
        importance: 3,
        available: 0
    },
    {
        id: 5,
        name: "UNINI",
        abbreviation: "UNINIMX",
        degree_abbreviation: "UNINIMX",
        origin: "",
        rest_path: "/webservice/rest/server.php",
        token: "",
        additional_data: null,
        translations: {"en_US": "International Ibero-American University", "pt_BR": "Universidade Internacional Iberoamericana", "pt_PT": "Universidade Internacional Iberoamericana"},
        modality: "virtual",
        parent: 1,
        importance: 4,
        available: 0
    },
    {
        id: 6,
        name: "FUNIBER-[FBR]",
        abbreviation: "FBR",
        degree_abbreviation: "FBR",
        origin: "https://campus.funiber.org",
        rest_path: "/webservice/rest/server.php",
        token: "65f62644902cbf7a06f962d4b68ea03a",
        additional_data: {"config_env": {"role_student": {"shortname": "student", "context_id": "1", "context_level": "system"}, "name_groupings": "Automatically created groups", "uuid_groupings": "f0ba1967-aa84-4f4a-8daa-560d81a1c8d0", "groupings_default": [{"name": "lang", "description": "", "abbreviation": "lang"}, {"name": "org", "description": "", "abbreviation": "org"}, {"name": "term", "description": "", "abbreviation": "term"}, {"name": "program", "description": "", "abbreviation": "program"}], "route_delete_group": "/group/delete.php?courseid=_COURSE_ID&groups=_GROUP_ID", "separator_id_number": "||", "description_groupings": "Externally Created Groups", "condition_for_registration": {"active": true, "programs": true, "incription": {"started_at": "2024-01-01T00:00:00.000Z"}}}},
        translations: {"en_US": "Iberoamerican University Foundation", "fr_FR": "Fondation Universitaire Ibéro-américaine", "it_IT": "Fondazione Universitaria Iberoamericana", "pt_BR": "Fundação Universitária Iberoamericana", "pt_PT": "Fundação Universitária Iberoamericana", "zh_CN": "伊比利亚美洲大学基金会"},
        modality: "virtual",
        parent: 1,
        importance: 5,
        available: 1
    },
    {
        id: 7,
        name: "UNIROMANA",
        abbreviation: "UNIROMANA",
        degree_abbreviation: "UNIROMANA",
        origin: "https://campus.uniromana.do",
        rest_path: "/webservice/rest/server.php",
        token: "",
        additional_data: null,
        translations: {"en_US": "University of la Romana", "es_ES": "Universidad de la Romana"},
        modality: "virtual",
        parent: 1,
        importance: 6,
        available: 0
    },
    {
        id: 8,
        name: "UNIC",
        abbreviation: "UNIC",
        degree_abbreviation: "UNIC",
        origin: "https://campus.unic.co.ao",
        rest_path: "/webservice/rest/server.php",
        token: "",
        additional_data: null,
        translations: {"en_US": "International University of Cuanza", "es_ES": "Universidad Internacional de Cuanza"},
        modality: "presential",
        parent: null,
        importance: null,
        available: 0
    },
    {
        id: 9,
        name: "UNEATLANTICO-PRESENTIAL",
        abbreviation: "UEA",
        degree_abbreviation: "UEA",
        origin: "https://campus.uneatlantico.es",
        rest_path: "/webservice/rest/server.php",
        token: "",
        additional_data: null,
        translations: {"en_US": "European University of the Atlantic", "fr_FR": "Université européenne de l'Atlantique", "it_IT": "Università Europea dell'Atlantico", "pt_BR": "Universidade Europeia do Atlântico", "pt_PT": "Universidade Europeia do Atlântico", "zh_CN": "大西洋欧洲大学"},
        modality: "presential",
        parent: null,
        importance: null,
        available: 0
    }
]
export default organizations;