import { useEffect, useRef, useState } from "react";

export const useFetch = ( url ) => {

    // con esto controlamos que el hook o el componente que lo usa este montado
    // y que cuando los valores de ismaounted no quiero lanzar una rederización del compoente
    // simplemete mantener la referencia al valor
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect( () => {
        // el return ocurre cuando el hook se demonta
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({data: null, loading: true, error: null});
      
        fetch( url )
            .then( resp => resp.json())
            .then( data => {
                // Si esta montado puedo llamar el serEstate
                if ( isMounted.current ) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })

    }, [url]);

    return state;
    
};
