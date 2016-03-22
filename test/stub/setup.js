import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

chai.use(sinonChai);

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    this.fetchMock = fetchMock;
    this.mockStore = mockStore;
});

afterEach(function() {
    this.fetchMock.restore();
    this.sinon.restore();

    // Очистка контекста тестов от созданных в нём, в процессе выполнения, элементов
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            delete this[key];
        }
    }
});
