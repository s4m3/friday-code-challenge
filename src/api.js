const HOST = 'http://localhost:8080';

/**
 * Surely this is an anti-pattern. I would not do this in a real world application.
 * I would instead log the error and not retry in this way because it would mean that
 * there is a server issue that needs to be investigated. Additionally I would use an ErrorBoundary.
 * But because the error is triggered randomly here, I retry until it resolves
 */
const MAX_TRIALS = 20;
const retryUntilResolves = async (call, trials = 0,) => {
  if (trials >= MAX_TRIALS) {
    throw new Error('Max trials reached');
  }
  const response = await call();
  if (response.ok) {
    return response;
  }
  console.error(`HTTP error: ${response.status}`);
  return retryUntilResolves(call, trials + 1,)
}

const GET = async (url) => {
  const response = await retryUntilResolves(async () => await fetch(url));
  return response.json();
}

const getMakes = async () => {
  return GET(`${HOST}/api/makes`);
};

const getModels = async (make = '') => {
  return GET(`${HOST}/api/models?make=${make}`);
};

const getVehicles = async (make = '', model = '') => {
  return GET(`${HOST}/api/vehicles?make=${make}&model=${model}`);
};

const api = {
  getMakes,
  getModels,
  getVehicles
}

export default api;
