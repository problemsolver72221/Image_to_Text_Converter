import {
  Flex,
  Image,
  Heading,
  Text,
  IconButton,
  Spinner,
  useToast,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { BiCopy } from "react-icons/bi";
import copy from "copy-to-clipboard";

type ShowOutputProps = {
  imgSrc?: string;
  outText?: string | null | object; // allow object but optional
  load?: boolean;
};

const ShowOutput: React.FC<ShowOutputProps> = ({ imgSrc, outText, load }) => {
  const toast = useToast();

  const handleCopy = () => {
    if (typeof outText === "string") {
      copy(outText);
      toast({
        position: "top",
        render: () => (
          <Box color="black" p={3} bg="#00DF0A" borderRadius={5}>
            Copied!
          </Box>
        ),
      });
    }
  };

  // Safely convert outText to string
  const renderText = React.useMemo(() => {
    if (!outText) return "Select Image & Convert";
    if (typeof outText === "string") return outText;
    try {
      return JSON.stringify(outText);
    } catch {
      return "Output unavailable";
    }
  }, [outText]);

  return (
    <Flex direction="column" align="center" justify="center" gap={4} w="100%">
      {imgSrc ? (
        <>
          <Image w="280px" src={imgSrc} alt="Selected Image" />

          {load ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <>
              <Flex justify="space-between" w="100%">
                <Heading size="lg">Text Output</Heading>
                <IconButton
                  isDisabled={typeof outText !== "string"}
                  onClick={handleCopy}
                  colorScheme="blue"
                  icon={<BiCopy size={20} />}
                  aria-label="Copy Text"
                />
              </Flex>

              <Box w="100%" border="4px double #BBBBBB" borderRadius={10} p={3}>
                <Text>{renderText}</Text>
              </Box>
            </>
          )}
        </>
      ) : (
        <Text as="b" fontSize="lg">
          Please Select an Image
        </Text>
      )}
    </Flex>
  );
};

export default ShowOutput;
