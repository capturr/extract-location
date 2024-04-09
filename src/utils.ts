export const normalizeCityName = (cityName: string) => {
    return cityName
        // Remove accents
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        // Replace dashs with spaces
        .replace(/\-/gi, ' ')
        // Lowercase
        .toLowerCase()
}
const wordClass = 'abcdefghijklmnopqrstuvwxyz_ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ';

export const isIn = (name: string, locationString: string ) => {

    const index = locationString.indexOf( name );
    if (index === -1)
        return false;

    // Check if prefixed by boundary
    const prefix = locationString[ index - 1 ];
    const suffix = locationString[ index + name.length ];
    if (wordClass.includes( prefix ) || wordClass.includes( suffix ))
        return false;

    return true;
}