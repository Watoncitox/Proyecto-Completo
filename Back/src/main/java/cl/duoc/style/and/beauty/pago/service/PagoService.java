package cl.duoc.style.and.beauty.pago.service;

import cl.duoc.style.and.beauty.pago.dto.PagoDTO;
import cl.duoc.style.and.beauty.pago.model.Pago;
import cl.duoc.style.and.beauty.pago.repository.PagoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PagoService {

    private final PagoRepository repository;

    public PagoService(PagoRepository repository) {
        this.repository = repository;
    }

    private PagoDTO toDTO(Pago p) {
        PagoDTO dto = new PagoDTO();
        dto.setId(p.getId());
        dto.setIdCita(p.getIdCita());
        dto.setMetodo(p.getMetodo());
        dto.setMonto(p.getMonto());
        dto.setFechaPago(p.getFechaPago());
        dto.setEstado(p.getEstado());
        return dto;
    }

    private Pago toEntity(PagoDTO dto) {
        Pago p = new Pago();
        p.setId(dto.getId());
        p.setIdCita(dto.getIdCita());
        p.setMetodo(dto.getMetodo());
        p.setMonto(dto.getMonto());
        p.setFechaPago(dto.getFechaPago());
        p.setEstado(dto.getEstado());
        return p;
    }

    public List<PagoDTO> findAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }


    public PagoDTO save(PagoDTO dto) {
        Pago entidad = toEntity(dto);
        Pago guardado = repository.save(entidad);
        return toDTO(guardado);
    }

    public PagoDTO findById(Long id) {
        return repository.findById(id).map(this::toDTO).orElse(null);
    }
}
