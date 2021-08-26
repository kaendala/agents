import Card from './Card';
import React from 'react';
import { render } from '@testing-library/react';
import useDimensions from '../../utils/hooks/window/useWindowDimensions';
import useStatistics from '../../utils/hooks/statistics/useStatistics.hook';

jest.mock('../../utils/hooks/statistics/useStatistics.hook');
jest.mock('../../utils/hooks/window/useWindowDimensions');
window.open = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test for Card component', () => {
  const device = 'mobile';
  mockWindowDimensionHook(device);
  useStatistics.mockReturnValue({
    tealium: {},
    setTealium: jest.fn(),
  });

  it('Should render the card', () => {
    const vehicle = {
      brand: 'Volskwagen',
      model: 'Bora',
      price: '$20.500.000',
      kilometers: '95.800 Km',
      year: '2014',
      phoneNumber: '3010000000,7543219',
      whatsappNumber:'3003665544',
      featuredIdentifierTag: 3,
      onlyImage: 'false',
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      seller : 'Concesionario'
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    expect(wrapper).toBeTruthy();
  });

  it('Should render the card receiving all the parameters', () => {
    const vehicle = {
      brand: 'Volskwagen',
      line: 'Bora',
      subtitle: 'Automatico',
      license: '***-**9',
      price: '$20.500.000',
      city: 'Bogotá',
      transmission: 'Secuencial',
      fuel: 'Gasolina',
      cylinderCapacity: '2500',
      kilometers: '95.800 Km',
      year: '2014',
      phoneNumber: '3010000000',
      phoneSeller: '3010000000',
      latestReleasesTag: 'true',
      brandImage:
        'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      whatsappNumber: '3160000000',
      whatsappMessage: 'Hola, estoy interesado en el vehículo',
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      newOfferTag: 'true',
      monthlyPrice: '$1000.000',
      fenomenoYa: 'true',
      featuredIdentifierTag: 1,
      seller: 'Concesionario',
      allPhones: [
          {
              firstPhone:"3002341111",
              secondPhone:"3108765432",
              thirdPhone:"7111111",
              fourthPhone:"5678321"
          }
        ]
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    wrapper.container.querySelector('.infoVehicle').click();
    expect(wrapper).toBeTruthy();
  });

  it('Should render Card without image and allow go to vehicle posted', () => {
    const vehicle = {
      id: '123456',
      brand: 'Nissan',
      line: 'Sentra',
      price: '$30.000.000',
      kilometers: '55.000 Km',
      year: '2014',
      phoneNumber: ',',
      whatsappNumber: '',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      featuredIdentifierTag: 1,
      status: 'nuevo',
      city: 'Bogotá',
      seller:'Concesionario'
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    const element = wrapper.container.querySelector('.infoCard .infoVehicle .titleCard');
    element.click();
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/detalle/nuevo/nissan/sentra/2014/bogota/123456',
    );
  });

  it('Should render Card with only image for promo Card', async () => {
    mockWindowDimensionHook('browser');
    const vehicle = {
      onlyImage: true,
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      keyVehicle: '0',
    };
    const wrapper = render(<Card vehicle={vehicle} stadistics="resultados-bloque_grid-"></Card>);
    wrapper.container.querySelector('.container-imageCard').click();
    expect(wrapper).toBeTruthy();
  });

  it('Should open the seller contact modal for desktop', async () => {
    const vehicle = {
      brand: 'Chevrolet',
      line: 'Alto',
      price: '$10.000.000',
      kilometers: '105.000 Km',
      year: '2004',
      fenomenoYa: 'true',
      seller: 'Particular',
      fenomenoYaPrecio: 'true',
      fenomenoYaSoleOwner: 'true',
      fenomenoYaLowMileage: 'true',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      featuredIdentifierTag: 3,
      cltelefono:"2657893",
      phoneSeller:"3105674321"
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    const element = wrapper.container.querySelector('.contactCard');
    element.firstChild.click();
    const modal = wrapper.container.querySelector('.modalContent');
    expect(modal).toBeTruthy();
    wrapper.container.querySelector('.primary').click();
    expect(window.open).toBeCalled();
  });

  it('Should allow close the seller contact modal', async () => {
    const wrapper = render(<Card vehicle={{}}></Card>);
    const element = wrapper.container.querySelector('.card');
    const event = new CustomEvent('show', {
      bubbles: true,
      cancelable: true,
      detail: 1,
    });
    element.dispatchEvent(event);
    const modal = wrapper.container.querySelector('.modalContent');
    const modalClose = wrapper.container.querySelector('.close');
    modalClose.click();
    expect(modal).toBeTruthy();
  });

  it('Should allow contact the seller directly to the call without opening modal for mobile', async () => {
    mockWindowDimensionHook('mobile');
    const vehicle = {
      brand: 'Volskwagen',
      line: 'Jetta',
      price: '$40.500.000',
      year: '2010',
      kilometers: '5.800 Km',
      whatsappNumber: '573160000000',
      whatsappMessage: 'Hola, estoy interesado en el vehículo',
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      newOfferTag: 'true',
      monthlyPrice: '$1000.000',
      seller: 'Concesionario',
      fenomenoYa: 'true',
      featuredIdentifierTag: 2,
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    const contactCard = wrapper.container.querySelector('.contactCard');
    contactCard.firstChild.click();
    expect(wrapper).toBeTruthy();
  });

  it('should redirect to whatsapp on mobile', async () => {
    const vehicle = {
      brand: 'Chevrolet',
      line: 'Alto',
      price: '$10.000.000',
      kilometers: '105.000 Km',
      whatsappNumber: '+573160000000',
      year: '2004',
      fenomenoYa: 'true',
      seller: 'Particular',
      fenomenoYaPrecio: 'true',
      fenomenoYaSoleOwner: 'true',
      fenomenoYaLowMileage: 'true',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      allPhones: [
        {
            firstPhone:"3002341111",
            secondPhone:"3108765432",
            thirdPhone:"7111111",
            fourthPhone:"5678321"
        }
        ]
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    const element = wrapper.container.querySelector('#whatsappLink');
    element.click();

    expect(window.open).toBeCalled();
  });

  it('should redirect to whatsapp on desktop', async () => {
    const vehicle = {
      brand: 'Chevrolet',
      line: 'Alto',
      price: '$10.000.000',
      kilometers: '105.000 Km',
      whatsappNumber: '3160000000',
      year: '2004',
      fenomenoYa: 'true',
      seller: 'Particular',
      fenomenoYaPrecio: 'true',
      fenomenoYaSoleOwner: 'true',
      fenomenoYaLowMileage: 'true',
      featuredIdentifierTag: 5,
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
    };

    const device = 'browser';
    mockWindowDimensionHook(device);

    const wrapper = render(<Card vehicle={vehicle}></Card>);
    wrapper.container.querySelector('.infoIcon').click();
    const element = wrapper.container.querySelector('#whatsappLink');
    element.click();
    wrapper.container.querySelector('.infoIcon').click();
    expect(window.open).toBeCalled();
  });

  it('shoud show card without label', async () => {
    mockWindowDimensionHook('browser');
    const vehicle = {
      id: '987654.do',
      onlyImage: false,
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      featuredIdentifierTag: 4,
      year: '2014',
      status: 'usado',
      city: 'Medellín',
      brand: 'chevrolet',
      line: 'optra',
      seller:"Concesionario",
      whatsappNumber:"3160000000",
      phoneNumber: '3160000000,',
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    wrapper.container.querySelector('.container-imageCard').click();
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/detalle/usado/chevrolet/optra/2014/medellin/987654.do',
    );
  });

  it('should send analytics event to second promotion card', async () => {
    mockWindowDimensionHook('browser');
    const vehicle = {
      onlyImage: true,
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      keyVehicle: '8',
    };
    const wrapper = render(<Card vehicle={vehicle} stadistics="resultados-bloque_grid-"></Card>);
    wrapper.container.querySelector('.container-imageCard').click();
    expect(useStatistics().setTealium).toBeCalled();
  });

  it('should send analytics event the number of card', async () => {
    mockWindowDimensionHook('browser');
    const vehicle = {
      onlyImage: true,
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      keyVehicle: '4',
    };
    const wrapper = render(<Card vehicle={vehicle} stadistics="resultados-bloque_grid-"></Card>);
    wrapper.container.querySelector('.container-imageCard').click();
    expect(useStatistics().setTealium).toBeCalled();
  });
   it('should send analytics event advertisign', async () => {
    mockWindowDimensionHook('browser');
    const vehicle = {
      onlyImage: true,
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      keyVehicle: '4',
    };
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    wrapper.container.querySelector('.container-imageCard').click();
    expect(useStatistics().setTealium).toBeCalled();
  });

  it('should show and hide tooltip', async () => {
    mockWindowDimensionHook('browser');
    const vehicle = {
      onlyImage: false,
      image: 'https://static.carroya.com/vehiculos/1980801/1980801_15_m.jpg',
      link:
        'https://uat.carroya.com/vehiculo/usado/volkswagen/gol/trendline/2019/bogotá/1962486.do',
      keyVehicle: '0',
      city: 'cali',
      transmission: 'manual',
      fuel: 'Gasolina',
      cylinderCapacity: '2500',
    };
    const device = 'mobile';
    mockWindowDimensionHook(device);
    const wrapper = render(<Card vehicle={vehicle}></Card>);
    let infoIcon = wrapper.container.querySelector('.infoIcon');
    infoIcon.click();
    wrapper.rerender(<Card vehicle={vehicle}></Card>);
    infoIcon = wrapper.container.querySelector('.infoIcon');
    expect(infoIcon.classList.contains('ant-popover-open')).toBe(true);
    const closeIcon = document.querySelector('.closeTooltip');
    closeIcon.click();
    wrapper.rerender(<Card vehicle={vehicle}></Card>);
    infoIcon = wrapper.container.querySelector('.infoIcon');
    expect(infoIcon.classList.contains('ant-popover-open')).toBe(false);
  });

  function mockWindowDimensionHook(_device) {
    useDimensions.mockReturnValue([
      {
        device: _device,
      },
    ]);
  }
});
