/* eslint-disable @typescript-eslint/no-explicit-any */
export function restructureData(data: any) {
    const structuredData = [];
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] === "string" && typeof data[i + 1] === "string") {
        structuredData.push({
          path: data[i],
          message: data[i + 1],
        });
        i++; // Skip the next element since it's already processed
      }
    }
    return structuredData;
  }