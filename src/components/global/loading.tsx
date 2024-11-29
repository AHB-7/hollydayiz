/**
 * Loading is a reusable component for displaying a loading spinner.
 * It provides a visually centered loader within a container.
 *
 * @component
 *
 * @example
 * // Example usage:
 * <Loading />
 */

import { Loader, LoaderContainer } from "../../styles";

export const Loading: React.FC = () => {
    return (
        <LoaderContainer>
            <Loader />
        </LoaderContainer>
    );
};
