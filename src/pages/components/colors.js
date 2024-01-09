import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";
import { usePageView } from "../../hooks/use-page-view";
import { Layout as ComponentsLayout } from "../../layouts/components";
import { Colors1 } from "../../sections/components/colors/colors-1";
import { Colors2 } from "../../sections/components/colors/colors-2";
import { Previewer } from "../../sections/components/previewer";

const components = [
  {
    element: <Colors1 />,
    title: "Main colors",
  },
  {
    element: <Colors2 />,
    title: "Severity colors",
  },
];

const Page = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>Components: Colors | HomeChef</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={8}>
            {components.map((component) => (
              <Previewer key={component.title} title={component.title}>
                {component.element}
              </Previewer>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <ComponentsLayout title="Colors">{page}</ComponentsLayout>
);

export default Page;
