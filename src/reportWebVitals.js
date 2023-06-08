const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(async ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      await getCLS(onPerfEntry);
      await getFID(onPerfEntry);
      await getFCP(onPerfEntry);
      await getLCP(onPerfEntry);
      await getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
