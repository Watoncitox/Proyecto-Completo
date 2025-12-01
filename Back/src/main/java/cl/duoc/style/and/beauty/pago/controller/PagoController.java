package cl.duoc.style.and.beauty.pago.controller;

import cl.duoc.style.and.beauty.pago.dto.PagoDTO;
import cl.duoc.style.and.beauty.pago.service.PagoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pago")
public class PagoController {

    private final PagoService service;

    public PagoController(PagoService service) {
        this.service = service;
    }

    @GetMapping
    public List<PagoDTO> listar() {
        return service.findAll();
    }

    @PostMapping
    public PagoDTO crear(@RequestBody PagoDTO dto) {
        return service.save(dto);
    }

    @GetMapping("/{id}")
    public PagoDTO buscar(@PathVariable Long id) {
        return service.findById(id);
    }
}
