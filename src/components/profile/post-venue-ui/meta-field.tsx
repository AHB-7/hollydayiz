import {
    FaWifi,
    Label,
    MdLocalParking,
    MdOutlineEmojiFoodBeverage,
    MdOutlinePets,
    MetaContainer,
} from "../../../styles";

export function MetaFields({ register }: { register: any }) {
    return (
        <MetaContainer>
            <Label>
                <input type="checkbox" {...register("meta.wifi")} />
                <FaWifi />
                <p>WiFi</p>
            </Label>
            <Label>
                <input type="checkbox" {...register("meta.parking")} />
                <MdLocalParking />
                <p>Parking</p>
            </Label>
            <Label>
                <input type="checkbox" {...register("meta.breakfast")} />
                <MdOutlineEmojiFoodBeverage />
                <p>Breakfast</p>
            </Label>
            <Label>
                <input type="checkbox" {...register("meta.pets")} />
                <MdOutlinePets />
                <p>Pets</p>
            </Label>
        </MetaContainer>
    );
}
