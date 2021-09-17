import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';

import ManageCocktails from '../../components/manageCocktails/ManageCocktails';

const testListCocktails = [
  {
    EtapesPreparations: [
      {
        id: "7fe02232-a8f4-456d-ad52-cde165adad16",
        numEtape: 1,
        texte: "Réalisez la recette dans un verre à mélange."
      },
      {
        id: "398ec5e2-7865-4808-9e76-49a475ac2288",
        numEtape: 2,
        texte: "Agiter les ingrédients dans un verre à mélange avec des glaçons (pour refroidir sans trop diluer)."
      }
    ],
    Ingredients: [
      {
        cocktails_ingredients: { quantite: "9", unite: "cl" },
        id: "e624bd35-e414-4874-a406-14a7d9d24231",
        nom: "Jus De Tomate"
      },
      {
        cocktails_ingredients: { quantite: "2", unite: "gouttes" },
        id: "13999790-02af-4b2e-9775-7ac19fc35f1b",
        nom: "Sauce Worcestershire"
      }
    ],
    Verre: { id: "0ec43307-8523-48c6-8fd9-06be72e484bd", nom: "Tumbler" },
    alcool: true,
    id: "b258592b-57ac-4bda-8e07-1d2697f20770",
    nom: "Bloody Mary",
    photo: "img_cocktail/bloodyMary.jpg",
  },
  {
    EtapesPreparations: [
      {
        id: "0d36c58c-ab65-4a5c-9fc5-f71d4022e3e6",
        numEtape: 1,
        texte: "Givrer le bord d'un verre à cocktail."
      },
      {
        id: "8788b31d-5f6e-48ba-a847-220255bb7e90",
        numEtape: 2,
        texte: "Verser la tequila, le cointreau et le jus de citron vert dans un shaker."
      },
      {
        id: "93ab24b2-bc51-4f9f-bdc9-0442cb71b3c5",
        numEtape: 3,
        texte: "Ajouter les glacons, et secouez vigoureusement pendant environ 10 secondes."
      },
      {
        id: "fd802959-a288-4265-b744-ad4e29feab2f",
        numEtape: 4,
        texte: "Versez dans le verre."
      },
      {
        id: "2e438d8a-093b-4b29-9e92-59271a94a03c",
        numEtape: 5,
        texte: "Décorer d'une rondelle de citron."
      },
    ],
    Ingredients: [
      {
        cocktails_ingredients: { quantite: "2", unite: "cl" },
        id: "38925fb2-2267-47c7-b62e-e134e41a51c7",
        nom: "Jus De Citron Vert"
      },
      {
        cocktails_ingredients: { quantite: "5", unite: "cl" },
        id: "a2631513-a18f-4629-8bef-90a773290709",
        nom: "Tequila"
      },
      {
        cocktails_ingredients: { quantite: "3", unite: "cl" },
        id: "5ef2e951-3704-43cf-b062-f60eac65ec5d",
        nom: "Triple Sec"
      }
    ],
    Verre: { id: "c69758d1-b4ad-4038-b157-205fd12d9ace", nom: "Verre à Cocktail" },
    alcool: true,
    id: "7e124810-e9a7-4724-ad48-c6a24bfaa1a5",
    nom: "Margarita",
    photo: "img_cocktail/margarita.jpg"
  },
  {
    EtapesPreparations: [
      {
        id: "e132fd2a-56b7-4a13-91ad-d4883a970baf",
        numEtape: 1,
        texte: "Recette réalisée directement dans un verre de type \"Tumbler\"."
      },
      {
        id: "aa00ab00-02de-44af-b5ab-cf808d18e82f",
        numEtape: 2,
        texte: "Placer les feuilles de menthe dans le verre, ajouter le sucre et le citron coupé en morceau. Piler l'ensemble."
      },
      {
        id: "ec0cfbb1-5911-46c1-a479-84fce3c62ddc",
        numEtape: 3,
        texte: "Ajouter les glacons pilés, puis le rhum à hauteur des glacons."
      },
      {
        id: "4528e3ec-be76-4202-ac1e-585a08f67dad",
        numEtape: 4,
        texte: "Compléter avec de l'eau gazeuse."
      },
      {
        id: "9bec4f6b-3516-4991-a888-540f3272694f",
        numEtape: 5,
        texte: "Décorer d'une feuille de menthe et servir avec une paille."
      }
    ],
    Ingredients: [
      {
        cocktails_ingredients: { quantite: null, unite: null },
        id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
        nom: "Eau Gazeuse"
      },
      {
        cocktails_ingredients: { quantite: "3", unite: "cl" },
        id: "38925fb2-2267-47c7-b62e-e134e41a51c7",
        nom: "Jus De Citron Vert"
      },
      {
        cocktails_ingredients: { quantite: "8", unite: "feuilles" },
        id: "740367a4-dedf-4093-86d1-50eac62b2521",
        nom: "Menthe"
      },
      {
        cocktails_ingredients: { quantite: "6", unite: "cl" },
        id: "bd799ef3-d7ae-4975-8be0-8f2397fa2b18",
        nom: "Rhum"
      },
      {
        cocktails_ingredients: { quantite: "5", unite: "gr" },
        id: "c3fd98ec-cad4-49c9-9a74-63ca90489a0a",
        nom: "Sucre"
      }
    ],
    Verre: { id: "0ec43307-8523-48c6-8fd9-06be72e484bd", nom: "Tumbler" },
    alcool: true,
    id: "7f73cf2f-7ed7-4be4-8640-69dbbc1b2927",
    nom: "Mojito",
    photo: "img_cocktail/mojito.jpg"
  },
  {
    EtapesPreparations: [
      {
        id: "36b4e87f-ee3c-4d1e-9875-40701dc53da6",
        numEtape: 1,
        texte: "Recette réalisée directement dans un verre de type \"Tumbler\"."
      },
      {
        id: "604f3c47-3233-4e90-bd79-92da5154bea5",
        numEtape: 2,
        texte: "Placer les feuilles de menthe dans le verre, ajouter le sucre et le citron coupé en morceau. Piler l'ensemble."
      },
      {
        id: "75e46d7e-5a1c-4a2b-acc4-5f1e179914a7",
        numEtape: 3,
        texte: "Ajouter les glacons pilés, puis l'eau gazeuse."
      },
      {
        id: "8f09ee71-b660-4c61-ae77-60a315d59313",
        numEtape: 4,
        texte: "Décorer d'une feuille de menthe et servir avec une paille."
      }
    ],
    Ingredients: [
      {
        cocktails_ingredients: { quantite: null, unite: null },
        id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
        nom: "Eau Gazeuse"
      },
      {
        cocktails_ingredients: { quantite: "3", unite: "cl" },
        id: "38925fb2-2267-47c7-b62e-e134e41a51c7",
        nom: "Jus De Citron Vert"
      },
      {
        cocktails_ingredients: { quantite: "8", unite: "feuilles" },
        id: "740367a4-dedf-4093-86d1-50eac62b2521",
        nom: "Menthe"
      },
      {
        cocktails_ingredients: { quantite: "2", unite: "gr" },
        id: "c3fd98ec-cad4-49c9-9a74-63ca90489a0a",
        nom: "Sucre"
      }
    ],
    Verre: { id: "0ec43307-8523-48c6-8fd9-06be72e484bd", nom: "Tumbler" },
    alcool: false,
    id: "f3714a47-8359-4552-850c-277b3b56fdd0",
    nom: "Virgin Mojito",
    photo: "img_cocktail/virgin-mojito.jpg"
  }
];

describe('<ManageCocktails />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeCocktails: testListCocktails,
  }));

  const manageCocktails = shallow(<ManageCocktails />);
  const divManageCocktails = manageCocktails.find('div.manage-cocktails');

  it('should contain a div with className="manage-cocktails"', () => {
    expect(divManageCocktails).to.have.length(1);
  })

  it('should contain a h4 tag with text="LES COCKTAILS"', () => {
    expect(divManageCocktails.find('h4')).to.have.length(1);
    expect(divManageCocktails.find('h4').text()).to.be.equal('LES COCKTAILS');
  })

  const divmanageCocktailsList = divManageCocktails.find('div.manage-cocktails-list');

  it('should contain a div with className="manage-cocktails-list"', () => {
    expect(divmanageCocktailsList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = divmanageCocktailsList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const divAddDeleteCocktails = divManageCocktails.find('div.add-delete-cocktails');

  it('should contain a div with className="add-delete-cocktails"', () => {
    expect(divAddDeleteCocktails).to.have.length(1);
  })

  it.skip('should contain 2 Button components with onClick attribute', () => {
    const addDeleteButtons = divAddDeleteCocktails.find(Button);
    expect(addDeleteButtons).to.have.length(2);
    addDeleteButtons.map(button => {
      expect(button.props()).to.have.property('onClick');
    })
  })
})