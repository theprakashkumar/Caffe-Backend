const getAddress = async (req, res) => {
    try {
        const addresses = req.addresses;

        res.status(200).json({
            success: true,
            addresses,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Accessing Address!",
            errorMessage: error.message,
        });
    }
};

const addNewAddress = async (req, res) => {
    try {
        const addresses = req.addresses;
        const { address } = req.body;

        addresses.addresses.push(address);

        const updatedAddresses = await addresses.save();
        res.status(200).json({
            success: true,
            updatedAddresses,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong While Adding New Address",
            errorMessage: error.message,
        });
    }
};

module.exports = { getAddress, addNewAddress };
